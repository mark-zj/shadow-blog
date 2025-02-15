<script>
import {mapActions} from "pinia";
import {useMusicStore} from "@/stores/music";

export default {
  name: 'MusicBox',
  props: {
    showMusicBox: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    const audio = new Audio();
    audio.preload = "metadata";
    // 设置默认音量
    audio.volume = this.deformattingVolume(this.volume);
    // 设置音乐是否预备回调
    audio.addEventListener('canplay', this.onMusicCanplayAtAudio);
    // 设置音乐缓冲回调
    audio.addEventListener('progress', this.onProgressAtAudio);
    // 设置时间更新回调
    audio.addEventListener('timeupdate', this.onTimeUpdateAtAudio);
    // 设置音乐是否播放完成回调
    audio.addEventListener('ended', this.onMusicPlayEndedAtAudio);
    // 设置缓冲的第一帧数据 (特例：防止第一首歌没有timeRangers出现继续播放的奇葩情况)
    audio.addEventListener('loadeddata', () => {
      if (this.bufferedProgress === 0 && audio.buffered.length > 0) {
        this.bufferedProgress = audio.buffered.end(audio.buffered.length - 1) / audio.duration * 100;
      }
    });
    this.audio = audio;
  },
  mounted() {
    this.loadMusicList().then(value => {
      this.musicList = value;
      if (value.length !== 0) {
        this.currentPlayIndex = 0;
      }
    });
  },
  destroyed() {
    if (!this.audio.paused) {
      this.audio.pause();
    }
    this.audio = null;
  },
  data: () => ({
    version: '1.0',
    versionTooltip: {
      text: '麻雀虽小, 但五脏俱全 ~',
      scrollStrategy: 'close',
      scrim: true,
      persistent: false,
      openOnClick: true,
      openOnHover: true,
    },
    // 位于内存中的播放器实例
    audio: null,
    // 音乐盒子的可见性
    visible: true,
    // 从后端获取的音乐数据
    musicList: [],
    // 正在播放的音乐位于musicList中的索引位置
    currentPlayIndex: null,
    // 正在播放的音乐
    musicBeingPlayed: {
      // 数据id
      id: null,
      // 歌曲名称
      name: '未知歌曲',
      // 歌唱者
      singer: '未知歌手',
      // 歌词
      lyrics: '',
      // 音乐播放地址
      src: null,
    },
    // 播放状态
    play: false,
    // 切歌自动播放 用于函数(playPrevMusic playNextMusic)
    changeMusicAutoplay: true,
    // 自动播放(只与播放方式相关联)
    autoplay: true,
    // 播放方式 0(顺序) 1(随机) 2(循环)
    playBackMethod: 0,
    // 音量
    volume: 50,
    // 是否显示音量调
    showVolumeSlider: true,
    // 播放的当前时间
    currentTime: 0,
    // 播放的总时间
    duration: 0,
    // 点击进度条控制audio获取的百分比(整数)
    playbackProgressPercentage: 0,
    // 播放进度
    playbackProgress: 0,
    // 缓冲进度
    bufferedProgress: 0,
    // 是否显示歌曲列表
    showMusicList: false,
    // 歌词加载遮罩
    showLyricsLoadingOverlay: false,
    // 歌词面板
    showLyricsPanel: false,
    // 第一次解析该歌词则打开
    lyricsLoading: false,
    // 解析过的歌词作为缓存
    parsedLyricsArray: [],
    // 当前解析过的歌词
    currentParsedLyrics: {
      id: '',
      title: '',
      author: '',
      album: '',
      by: '',
      offset: 0,
      other: [],
      data: [{id: '', time: 0, displayTime: '0', content: ''}],
    },
    // 激活的歌词项的id
    activeLyricItemId: 'lyric-item-0',
    // 中断歌词渲染相关
    interruptTimeoutId: null,
    interruptLyricScroll: false,
  }),
  computed: {
    getVolumeSliderWidthByBreakpoint() {
      return this.$vuetify.display.mobile ? 100 : 150;
    },
    getPlayBtnIconByPlayStatus() {
      return this.play ? 'mdi-pause' : 'mdi-play';
    },
    getSliderPrependIconByVolume() {
      const v = this.volume;
      if (v === 0) return 'mdi-volume-mute';
      if (v < 25) return 'mdi-volume-low';
      if (v < 50) return 'mdi-volume-medium';
      if (v < 75) return 'mdi-volume-high';
      return 'mdi-volume-vibrate';
    },
    getLyricsBtnIconByIsShowLyricsPanel() {
      return this.showLyricsPanel ? 'mdi-alpha-l-box' : 'mdi-alpha-l-box-outline';
    },
    getMusicListMenuIconByIsShowMusicList() {
      return this.showMusicList ? 'mdi-menu-close' : 'mdi-menu-open';
    },
    getPlayStatus() {
      return this.play ? 'play' : 'pause';
    },
    getFormatVolume() {
      return this.formatVolume(this.volume);
    },
    getFormatCurrentTime() {
      return this.formatTime(this.currentTime);
    },
    getFormatDuration() {
      return this.formatTime(this.duration);
    },
    getActiveLyricItemStyle() {
      return (currentItem) => {
        const content = this.$vuetify.display.smAndDown ? 'lyric-content-mobile' : 'lyric-content';
        if (currentItem === this.activeLyricItemId) {
          const baseClasses = 'text-primary';
          const active = this.$vuetify.display.smAndDown ? 'lyric-content-active-mobile' : 'lyric-content-active';
          return `${baseClasses} ${content} ${active}`;
        }
        return `text-medium-emphasis ${content}`;
      };
    },
    getPlayBtnDisable() {
      return this.musicList.length === 0;

    },
    getPlayPrevBtnDisable() {
      return this.musicList.length === 0 || this.currentPlayIndex === 0;

    },
    getPlayNextBtnDisable() {
      return this.musicList.length === 0 || this.currentPlayIndex === this.musicList.length - 1;
    },
    getPlayBackMethodIcon() {
      switch (this.playBackMethod) {
        case 0:
          return 'mdi-shuffle-disabled';
        case 1:
          return 'mdi-shuffle';
        case 2:
          return 'mdi-sync';
      }
    },
    getMusicMediaTypeBeingPlayed() {
      const src = `${this.musicBeingPlayed.src}`;
      return src.substring(src.lastIndexOf('.') + 1, src.length);
    },
  },
  watch: {
    showMusicBox(value) {
      this.visible = value;
    },

    visible(value) {
      this.visible = value;
      this.$emit('visibleChange', value);
      if (!value && this.showMusicList)
        this.showMusicList = false;
    },

    'musicBeingPlayed.src'(src) {
      this.audio.src = src;
    },

    play() {
      // 检测play的值来控制 audio是否开始播放还是暂停
      if (this.getPlayStatus === 'pause') {
        this.audio.pause();
        return;
      }
      try {
        this.audio.play().then(value => {
          console.log('audio 开始播放 ~', value);
        }).catch(reason => {
          console.log('audio 播放失败 !', reason);
        });
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 控制进度条来控制播放的时间点
     * @param value
     */
    playbackProgressPercentage(value) {
      value = value / 100;
      this.audio.currentTime = value * this.duration;
    },

    /**
     * 实际切歌逻辑
     * @param newIndex
     * @returns {Promise<void>}
     */
    async currentPlayIndex(newIndex) {
      this.play = false;
      this.playbackProgress = 0;
      this.bufferedProgress = 0;
      const {id, name, singer, src_url, lyric_url} = this.musicList.at(newIndex);
      this.musicBeingPlayed = {id, name, singer};
      // this.musicBeingPlayed['src'] = await this.loadMusicFileContentAsURL(src_url); 等待完全载入后接入内部地址
      // 懒加载：只给到载入地址不需等待
      this.musicBeingPlayed['src'] = this.getMusicFileHrefFromAssetsByName(`${src_url}`);
      // 如果显示了歌词面板，那么切歌时久应该打开歌词加载遮罩
      if (this.showLyricsPanel) this.showLyricsLoadingOverlay = true;
      const cache = this.getParsedLyricFromCacheById(id);
      if (cache === null) {
        const lyricOriginContent = lyric_url == null ? '' : await this.loadLyricsFileContentByURL(lyric_url);
        this.musicBeingPlayed['lyrics'] = lyricOriginContent;
        this.parseLyricsToArray({id, name, singer, lyrics: lyricOriginContent}).then(value => {
          this.currentParsedLyrics = value;
          this.parsedLyricsArray.push(value);
          this.showLyricsLoadingOverlay = false;
        }).catch(reason => {
          console.log(reason);
        });
        return;
      }
      this.currentParsedLyrics = cache;
      this.showLyricsLoadingOverlay = false;
    },
  },
  methods: {
    ...mapActions(useMusicStore, ['loadMusicList', 'loadLyricsFileContentByURL', 'loadMusicFileContentAsURL']),

    getMusicFileHrefFromAssetsByName(name) {
      return new URL(`../../assets/music/${name}`, import.meta.url).href;
    },

    // getMusicFileHrefFromAssets(fileName, typeName) {
    //   return new URL(`../../assets/music/${fileName}.${typeName}`, import.meta.url).href;
    // },
    // getLyricFileHrefFromAssets(fileName, typeName) {
    //   return new URL(`../../assets/music/lyric/${fileName}.${typeName}`, import.meta.url).href;
    // },
    // getMusicMetaHrefFromAssets() {
    //   return new URL(`../../assets/music/config/meta.json`, import.meta.url).href;
    // },

    /**
     * 改变播放方式
     */
    changePlayBackMethod() {
      this.playBackMethod++;
      if (this.playBackMethod > 2) this.playBackMethod = 0;
    },

    /**
     * 播放前一首
     */
    playPrevMusic() {
      this.currentPlayIndex--;
      if (!this.changeMusicAutoplay) return;
      this.$nextTick(() => {
        this.changePlayStatus();
      });
    },

    /**
     * 播放下一首
     */
    playNextMusic() {
      this.currentPlayIndex++;
      if (!this.changeMusicAutoplay) return;
      this.$nextTick(() => {
        this.changePlayStatus();
      });
    },

    /**
     * 改变歌曲列表显示状态
     */
    changeIsShowMusicList() {
      this.showMusicList = !this.showMusicList;
    },

    /**
     * 关闭音乐盒子
     */
    putAwayTheMusicBox() {
      this.visible = false;
    },

    /**
     * 改变播放状态
     */
    changePlayStatus() {
      this.play = !this.play;
    },

    /**
     * 根据音乐索引切歌并播放
     * @param index
     */
    changePlayCurrentMusic(index) {
      if (index === this.currentPlayIndex) {
        this.changePlayStatus();
        return;
      }
      this.currentPlayIndex = index;
      this.$nextTick(() => {
        this.changePlayStatus();
      });
    },

    /**
     * 格式化音量
     * @param volume
     * @returns {number}
     */
    formatVolume(volume) {
      return Math.floor(volume);
    },

    /**
     * 去格式化音量
     * @param volume
     * @returns {number}
     */
    deformattingVolume(volume) {
      return volume / 100;
    },

    /**
     * 格式化播放时间
     * @param seconds_
     * @returns {string}
     */
    formatTime(seconds_) {
      if (seconds_ === 0) return '0:00';
      // 1.处理分钟
      const minutes = Math.floor(seconds_ / 60);
      // 2.处理秒
      const seconds = Math.floor(seconds_ - (minutes * 60));
      return `${minutes}:${seconds < 10 ? '0' + `${seconds}` : `${seconds}`}`;
    },

    /**
     * 监听slider的值的update
     * @param volume
     */
    onSetVolume(volume) {
      this.audio.volume = this.deformattingVolume(volume);
    },
    ////////////////////////////////////////////////////////////////////////////// audio事件处理 开始
    /**
     * 关于Audio的事件回调-音乐已经预备
     * @param e
     */
    onMusicCanplayAtAudio(e) {
      this.currentTime = e.target.currentTime;
      this.duration = e.target.duration;
    },

    /**
     * 关于Audio的事件回调-音乐已经播放完毕
     */
    onMusicPlayEndedAtAudio() {
      this.play = false;
      this.$nextTick(() => {
        switch (this.playBackMethod) {
          case 0:
            // 顺序播放
            if (this.currentPlayIndex + 1 < this.musicList.length)
              this.currentPlayIndex++;
            else
              this.currentPlayIndex = 0;
            break;
          case 1:
            // 随机播放
            const index = parseInt(`${Math.random() * this.musicList.length}`, 10);
            this.currentPlayIndex = index;
            break;
          case 2:
            // 循环播放
            this.changePlayStatus();
            return;
        }
        this.$nextTick(() => {
          this.play = this.autoplay;
        });
      });
    },

    /**
     * 关于Audio的事件回调-时间正在更新
     * @param e
     */
    onTimeUpdateAtAudio(e) {
      const audio = e.target;
      // 1.更新时间
      this.currentTime = audio.currentTime;
      // 2.更新播放进度
      this.playbackProgress = (this.currentTime / this.duration) * 100;
      // 3.激活歌词样式
      this.activateTheLyricsStyle();
    },

    /**
     * 关于Audio的事件回调-正在下载数据
     * @param e
     */
    onProgressAtAudio(e) {
      const audio = e.target;
      if (audio.buffered.length > 0) {
        // 问题：使用this.duration属性并切歌时导致当前音乐的缓冲时间滞留在上一首的缓冲总时间
        // 分析：框架渲染时，优先于onProgressAtAudio，导致数据为旧数据
        const endTime = audio.buffered.end(audio.buffered.length - 1);
        this.bufferedProgress = (endTime / audio.duration) * 100;
      }
    },
    ////////////////////////////////////////////////////////////////////////////// audio事件处理 结束

    ////////////////////////////////////////////////////////////////////////////// 歌词解析 开始
    // 根据当前播放的歌曲的id从缓存中获取解析的歌词
    getParsedLyricFromCacheById(musicId) {
      const index = this.parsedLyricsArray.findIndex((value) => {
        const {id} = value;
        return musicId === id;
      });
      if (index === -1) return null;
      // console.info('命中歌词缓存');
      return this.parsedLyricsArray.at(index);
    },

    /**
     * 改变歌词面板的可见性
     */
    changeIsShowLyrics() {
      // 在面板显示的状态中切歌
      // 1.如果有解析过直接选中parsedLyricsArray返回， 赋值给parsedLyrics
      // 2.如果没有解析过解析放入parsedLyricsArray，赋值给parsedLyrics
      this.lyricsLoading = true;
      const lyricFromCache = this.getParsedLyricFromCacheById(this.musicBeingPlayed.id);
      if (lyricFromCache == null) {
        this.parseLyricsToArray(this.musicBeingPlayed).then(value => {
          this.currentParsedLyrics = value;
          this.parsedLyricsArray.push(value);
          this.lyricsLoading = false;
          this.showLyricsPanel = !this.showLyricsPanel;
        }).catch(reason => {
          this.lyricsLoading = false;
          console.log(reason);
        });
      } else {
        this.lyricsLoading = false;
        this.currentParsedLyrics = lyricFromCache;
        this.showLyricsPanel = !this.showLyricsPanel;
      }
    },

    /**
     * 将超长字符串解析为数组以供遍历
     * @param id
     * @param name
     * @param singer
     * @param lyrics
     * @returns {Promise<{other: [], offset: number, data: [], author: string, album: string, by: string, title: string}>}
     */
    async parseLyricsToArray({id, name, singer, lyrics}) {
      const timeChecker = new RegExp("\\[[0-9]{1,2}:[0-9]{1,2}.[0-9]{1,2}\]");
      let lyrics_ = [];
      const data = [];
      const result = {
        id: id,
        title: name,
        author: singer,
        album: '未知',
        by: '未知',
        offset: 0,
        other: [],
        data: [],
      };
      // 1. 根据换行符分割字符串
      lyrics_ = lyrics.split(new RegExp(/\n/)).filter((v) => v.trim() !== '');
      const searcher = new RegExp("\]");
      let idCount = 0;
      for (let i = 0; i < lyrics_.length; i++) {
        const v = lyrics_[i];
        // 2.找到这一行最后出现的] 之前的就是时间，之后的就是内容
        const lastIndex = v.search(searcher);
        let timeString = v.substring(0, lastIndex + 1);
        // 3.排除异己
        if (!timeChecker.test(timeString)) {
          timeString = timeString.substring(1, timeString.length - 1);
          // 获取分段索引
          const length = timeString.length;
          const index = timeString.search(':');
          const name = timeString.substring(0, index);
          const val = timeString.substring(index + 1, length);
          if (val.length === 0) continue;
          switch (name) {
            case 'ti':
              result['title'] = val;
              break;
            case 'ar':
              result['author'] = val;
              break;
            case 'al':
              result['album'] = val;
              break;
            case 'by':
              result['by'] = val;
              break;
            case 'offset':
              result['offset'] = val;
              break;
            default : {
              result['other'] = val;
              console.warn('无法转换的格式，可能是未能考虑到这个格式!');
            }
          }
          continue;
        }
        /////
        const content_ = v.substring(lastIndex + 1, v.length);
        if (content_.length === 0) continue;
        /////
        data.push(
          {
            id: `lyric-item-${idCount.toString()}`,
            displayTime: timeString,
            // 4.截取时间
            time: this.parseTimeStringToSeconds(timeString),
            // 5.截取内容
            content: content_,
          }
        );
        idCount++;
      }
      result.data = data;
      if (result.data.length === 0) {
        result.other.push('暂无歌词 ~');
      }
      return result;
    },

    /**
     * 对初始timeString移除中括号[]
     * @param timeString
     * @returns {string}
     */
    removeTheBrackets(timeString) {
      return timeString.substring(1, timeString.length - 1);
    },

    /**
     * 解析时间
     * @param timeString
     * @returns {string}
     */
    parseTimeStringToSeconds(timeString) {
      // 去括号[]
      timeString = this.removeTheBrackets(timeString);
      // 获取分段索引
      const index = timeString.search(':');
      // 获取分钟
      let minutes = parseInt(timeString.substring(0, index));
      // 获取秒数
      let seconds = parseFloat(timeString.substring(index + 1, timeString.length));
      minutes *= 60;
      return parseFloat(`${seconds += minutes}`).toFixed(2);
    },
    ////////////////////////////////////////////////////////////////////////////// 歌词解析 结束

    /**
     * 根据当前时间获取应该激活歌词样式的歌词项的id
     * @returns {number}
     */
    async activateTheLyricsStyle() {
      if (!this.showLyricsPanel) return;
      this.currentParsedLyrics.data.forEach(({id, time}) => {
        if (this.currentTime >= time) {
          this.activeLyricItemId = id;
          if (this.interruptLyricScroll) return;
          const lyricItemElement = document.getElementById(id);
          lyricItemElement.scrollIntoView({behavior: "smooth", block: 'center'});
        }
      });
    },

    // debounce(func, delay) {
    //   let timeout;
    //   return function () {
    //     clearTimeout(timeout);
    //     timeout = setTimeout(() => func.apply(this, arguments), delay);
    //   };
    // },

    /**
     * 作用于鼠标滚动的事件，用于中断程序滚动事件
     * @param e wheelEvent
     */
    onWheelLyricsScroll(e) {
      const element = document.getElementById('lyrics-container');
      element.scrollTo({
        top: element.scrollTop + e.deltaY * 1.5,
        behavior: 'smooth'
      });
      this.interruptLyricGroupScroll();
    },

    /**
     * 作用于触摸滑动动的事件，用于中断程序滚动事件
     */
    onTouchLyricsScroll() {
      this.interruptLyricGroupScroll();
    },

    /**
     * 公共中断函数，服务于onWheelLyricsScroll , onTouchLyricsScroll
     */
    interruptLyricGroupScroll() {
      if (this.interruptTimeoutId != null) clearTimeout(this.interruptTimeoutId);
      this.interruptLyricScroll = true;
      this.interruptTimeoutId = setTimeout(() => {
        this.interruptLyricScroll = false;
      }, 2000);
    },

    /**
     * 点击歌词项跳转至对应的时间点
     * @param toggle
     * @param time
     */
    goToCurrentTimeByTime(toggle, time) {
      toggle();
      this.audio.currentTime = time;
    },
  },
}
</script>
<template>
  <v-bottom-sheet
    id="bottom-sheet"
    class="public-transition"
    content-class="music-box"
    :model-value="visible"
    :scrim="showLyricsPanel"
    scroll-strategy="none"
    inset
    persistent
    no-click-animation>
    <!--  歌词box开始 -->
    <v-scale-transition>
      <v-container
        v-if="showLyricsPanel"
        id="lyrics-parent-container"
        class="position-relative overflow-y-hidden overflow-x-hidden rounded-t"
        :class="{'bg-surface': $vuetify.theme.name !== 'shadowTheme'}"
        fluid>
        <!--    版本标签开始    -->
        <v-chip
          size="x-small"
          class="position-absolute top-0 left-0 cursor-pointer font-italic"
          :text="`v${version}`"
          density="compact"
          variant="text"
          prepend-icon="mdi-music-box"
          tile
          v-tooltip:top="versionTooltip"
        />
        <!--    版本标签结束    -->

        <!--    歌词加载遮罩开始    -->
        <v-overlay
          v-model="showLyricsLoadingOverlay"
          class="align-center justify-center"
          contained
          persistent>
          <v-progress-circular color="primary" indeterminate/>
          <span class="pl-5 font-weight-bold text-caption">正在加载歌词...</span>
        </v-overlay>
        <!--    歌词加载遮罩结束    -->

        <!--    歌词box主体开始    -->
        <v-row class="h-100">
          <v-col cols="12" class="h-25 text-center" align-self="center">
            <!--    歌词信息开始    -->
            <v-row>
              <v-col cols="12" class="ma-0">
                <div class="text-capitalize" :class="$vuetify.display.smAndUp ? 'text-h4' : 'text-h5'">
                  <span class="text-decoration-underline">
                    {{ currentParsedLyrics.title }}
                  </span>
                  <span class="position-relative">
                    <span class="position-absolute top-0 left-0 ml-1 font-weight-thin text-caption text-uppercase">
                      {{ getMusicMediaTypeBeingPlayed }}
                    </span>
                  </span>
                </div>
              </v-col>
              <v-col cols="12" class="text-caption ma-0">
                <v-row>
                  <v-col cols="6" md="12" class="pa-0 ma-0">
                    <div class="d-inline-flex gc-1">
                      <v-icon>mdi-album</v-icon>
                      {{ currentParsedLyrics.album }}
                    </div>
                  </v-col>
                  <v-col cols="6" md="12" class="pa-0 ma-0">
                    <div class="d-inline-flex gc-1">
                      <v-icon>mdi-microphone</v-icon>
                      {{ currentParsedLyrics.author }}
                    </div>
                  </v-col>
                  <v-col cols="6" md="12" class="pa-0 ma-0">
                    <div class="d-inline-flex gc-1">
                      <v-icon>mdi-pencil-outline</v-icon>
                      {{ currentParsedLyrics.by }}
                    </div>
                  </v-col>
                  <v-col cols="6" md="12" class="pa-0 ma-0">
                    <div class="d-inline-flex gc-1">
                      <v-icon>mdi-location-enter</v-icon>
                      {{ currentParsedLyrics.offset }}
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12"
                 id="lyrics-container"
                 class="h-75 border-t overflow-y-scroll"
                 @scroll.prevent.stop="onTouchLyricsScroll"
                 @wheel.prevent.stop="onWheelLyricsScroll">
            <!--    歌词 item 开始    -->
            <v-item-group
              id="lyrics-item-group"
              :class="{'h-100 d-flex align-center justify-center':currentParsedLyrics.data.length === 0}"
              selected-class="text-primary">
              <template v-if="currentParsedLyrics.data.length !== 0">
                <template v-for="({id,time,displayTime,content}) in currentParsedLyrics.data">
                  <v-item #default="{ isSelected, selectedClass,toggle }">
                    <v-hover #default="{isHovering,props}">
                      <div class="position-relative my-3">
                        <v-card
                          v-bind="props"
                          color="transparent"
                          class="music-box-lyric-card"
                          :class="['d-flex align-center justify-center', selectedClass]"
                          :id="id"
                          @click="goToCurrentTimeByTime(toggle,time)">
                          <v-card-item class="font-weight-bold" :class="getActiveLyricItemStyle(id)" v-html="content"/>
                        </v-card>
                        <div
                          v-if="!$vuetify.display.smAndDown"
                          v-bind="props"
                          class="cursor-pointer position-absolute top-0 bottom-0 right-0">
                          <div
                            class="d-flex align-center justify-center h-100 text-subtitle-2 gc-1 px-5 text-primary lyric-hover"
                            v-if="isHovering">
                            <v-btn
                              prepend-icon="mdi-play"
                              variant="text"
                              :text="removeTheBrackets(displayTime)"
                              @click="goToCurrentTimeByTime(toggle,time)"/>
                          </div>
                        </div>
                      </div>
                    </v-hover>
                  </v-item>
                </template>
              </template>
              <template v-else>
                <template v-for="(item) in currentParsedLyrics.other">
                  <v-item>
                    <v-card
                      color="transparent"
                      class="music-box-lyric-card d-flex align-center justify-center"
                      :title="item"
                    />
                  </v-item>
                </template>
              </template>
            </v-item-group>
            <!--    歌词item结束    -->
          </v-col>
        </v-row>
        <!--    歌词box主体结束    -->
      </v-container>
    </v-scale-transition>
    <!--  歌词box结束  -->

    <!--  歌曲列表开始  -->
    <div class="position-relative">
      <v-scroll-x-reverse-transition>
        <v-list
          style="z-index: 2021"
          v-if="showMusicList"
          class="position-absolute bottom-0 right-0 border-b-0 rounded-t music-list"
          bg-color="rgba(var(--v-theme-surface),.8)"
          height="400px"
          width="300px"
          lines="one"
          active-color="primary"
          nav
          activatable
          border>
          <v-list-subheader
            class="rounded"
            sticky>
            当前播放队列：共计<span class="text-primary">{{musicList.length}}</span>首歌曲~
          </v-list-subheader>
          <template v-for="({id,name,singer},index) in musicList">
            <v-hover #default="{props , isHovering}">
              <v-list-item
                class="py-2"
                v-bind="props"
                :title="name"
                :subtitle="singer"
                :active="currentPlayIndex === index"
                :key="id"
                @click="changePlayCurrentMusic(index)"
                link>
                <template #prepend>
                  <div class="px-3">
                    <v-scroll-x-transition hide-on-leave>
                      <div v-if="currentPlayIndex === index">
                        <v-icon size="small" icon="mdi-music-note" />
                      </div>
                      <div v-else>{{ index + 1 }}</div>
                    </v-scroll-x-transition>
                  </div>
                </template>
                <template #append>
                  <div v-if="isHovering">
                    <v-btn
                      density="compact"
                      class="music-list-item-hover"
                      :icon="this.play && currentPlayIndex === index ? 'mdi-pause' : 'mdi-play'"
                      variant="text"
                      @click.stop="changePlayCurrentMusic(index)"
                    />
                  </div>
                </template>
              </v-list-item>
            </v-hover>
          </template>
        </v-list>
      </v-scroll-x-reverse-transition>
    </div>
    <!--  歌曲列表结束  -->

    <!--  操作台box开始  -->
    <v-sheet
      id="internal-music-box"
      class="overflow-visible elevation-0"
      color="transparent">
      <!--   音乐播放进度条   -->
      <v-progress-linear
        class="cursor-pointer"
        color="primary"
        v-model="playbackProgressPercentage"
        :model-value="playbackProgress"
        :buffer-value="bufferedProgress"
        rounded-bar
        stream
        striped
        clickable
      />

      <!--  通用布局开始    -->
      <v-list
        v-if="!$vuetify.display.smAndDown"
        class="overflow-visible"
        bg-color="rgba(var(--v-theme-surface),.9)">
        <v-list-item>
          <!--   音乐名称   -->
          <v-list-item-title>{{ musicBeingPlayed.name }}</v-list-item-title>
          <!--   音乐歌唱者   -->
          <v-list-item-subtitle>{{ musicBeingPlayed.singer }}</v-list-item-subtitle>
          <!--   播放器按钮开始   -->
          <template #append>
            <div class="text-subtitle-2">
              {{ getFormatCurrentTime }} / {{ getFormatDuration }}
            </div>
            <v-divider class="ml-3" color="primary" vertical thickness="1"/>
            <!--     隐藏 music box 按钮       -->
            <v-btn
              icon="mdi-export"
              variant="text"
              :ripple="{class: 'text-primary'}"
              @click="putAwayTheMusicBox"
            />
            <!--     歌词按钮       -->
            <v-btn
              :loading="lyricsLoading"
              :icon="getLyricsBtnIconByIsShowLyricsPanel"
              variant="text"
              :ripple="{class: 'text-primary'}"
              @click="changeIsShowLyrics"
            />
            <!--      播放方式      -->
            <v-btn
              :icon="getPlayBackMethodIcon"
              :ripple="{class: 'text-primary'}"
              variant="text"
              @click="changePlayBackMethod"
            />
            <!--     音量条开始       -->
            <v-slider
              v-if="showVolumeSlider"
              v-model="volume"
              :width="getVolumeSliderWidthByBreakpoint"
              direction="horizontal"
              :thumb-label="getFormatVolume"
              thumb-size="15"
              track-size="3"
              hide-details
              hide-spin-buttons
              @update:model-value="onSetVolume">
              <template #prepend>
                <v-icon class="opacity-100">
                  {{ getSliderPrependIconByVolume }}
                </v-icon>
              </template>
            </v-slider>
            <!--     音量条结束       -->
            <!--      上一首      -->
            <v-btn
              icon="mdi-rewind"
              :ripple="{class: 'text-primary'}"
              variant="text"
              @click="playPrevMusic"
              :disabled="getPlayPrevBtnDisable"
            />
            <!--      播放或者暂停      -->
            <v-btn
              :icon="getPlayBtnIconByPlayStatus"
              variant="text"
              :ripple="{class: 'text-primary'}"
              @click="changePlayStatus"
              :disabled="getPlayBtnDisable"
            />
            <!--      下一首      -->
            <v-btn
              icon="mdi-fast-forward"
              :ripple="{class: 'text-primary'}"
              variant="text"
              @click="playNextMusic"
              :disabled="getPlayNextBtnDisable"
            />
            <!--      音乐列表      -->
            <v-btn
              :icon="getMusicListMenuIconByIsShowMusicList"
              :ripple="{class: 'text-primary'}"
              variant="text"
              @click="changeIsShowMusicList"
            />
          </template>
          <!--   播放器按钮开始   -->
        </v-list-item>
      </v-list>
      <!--  通用布局结束    -->

      <!--  手机布局开始    -->
      <v-list
        v-else
        class="overflow-visible"
        bg-color="rgba(var(--v-theme-surface),.9)">
        <v-list-item>
          <!--   音乐名称   -->
          <v-list-item-title>{{ musicBeingPlayed.name }}</v-list-item-title>
          <!--   音乐歌唱者   -->
          <v-list-item-subtitle>{{ musicBeingPlayed.singer }}</v-list-item-subtitle>
          <!--   播放器按钮开始   -->
          <template #append>
            <div class="text-subtitle-2">
              {{ getFormatCurrentTime }} / {{ getFormatDuration }}
            </div>
            <v-divider class="mx-2" color="primary" vertical thickness="2"/>
            <!--     歌词按钮     -->
            <v-btn
              density="comfortable"
              :loading="lyricsLoading"
              :icon="getLyricsBtnIconByIsShowLyricsPanel"
              variant="text"
              :ripple="{class: 'text-primary'}"
              @click="changeIsShowLyrics"
            />
            <!--      音乐列表      -->
            <v-btn
              density="comfortable"
              :icon="getMusicListMenuIconByIsShowMusicList"
              :ripple="{class: 'text-primary'}"
              variant="text"
              @click="changeIsShowMusicList"
            />
          </template>
          <!--   播放器按钮开始   -->
        </v-list-item>
        <v-list-item class="d-flex flex-row justify-space-around">
          <template #prepend>
            <div class="d-flex flex-row justify-space-between">
              <!--      上一首      -->
              <v-btn
                density="default"
                icon="mdi-rewind"
                :ripple="{class: 'text-primary'}"
                variant="text"
                @click="playPrevMusic"
                :disabled="getPlayPrevBtnDisable"
              />
              <!--      播放或者暂停      -->
              <v-btn
                density="default"
                :icon="getPlayBtnIconByPlayStatus"
                variant="text"
                :ripple="{class: 'text-primary'}"
                @click="changePlayStatus"
                :disabled="getPlayBtnDisable"
              />
              <!--      下一首      -->
              <v-btn
                density="default"
                icon="mdi-fast-forward"
                :ripple="{class: 'text-primary'}"
                variant="text"
                @click="playNextMusic"
                :disabled="getPlayNextBtnDisable"
              />
            </div>
          </template>
          <!--      播放方式      -->
          <v-btn
            density="comfortable"
            :icon="getPlayBackMethodIcon"
            :ripple="{class: 'text-primary'}"
            variant="outlined"
            @click="changePlayBackMethod"
          />
          <template #append>
            <!--     音量条开始       -->
            <v-slider
              density="comfortable"
              v-if="showVolumeSlider"
              v-model="volume"
              :width="getVolumeSliderWidthByBreakpoint"
              direction="horizontal"
              :thumb-label="getFormatVolume"
              thumb-size="15"
              track-size="3"
              hide-details
              hide-spin-buttons
              @update:model-value="onSetVolume">
              <template #prepend>
                <v-icon class="opacity-100">
                  {{ getSliderPrependIconByVolume }}
                </v-icon>
              </template>
            </v-slider>
            <!--     隐藏 music box 按钮       -->
            <v-btn
              density="comfortable"
              icon="mdi-export"
              variant="text"
              :ripple="{class: 'text-primary'}"
              @click="putAwayTheMusicBox"
            />
          </template>
        </v-list-item>
      </v-list>
      <!--  手机布局结束    -->

    </v-sheet>
    <!--  操作台box结束  -->
  </v-bottom-sheet>
</template>
<style lang="scss">
@import '@/styles/main';

#lyrics-parent-container {
  height: 100vh;
}

#lyrics-container {
  scrollbar-width: none;
}

.music-box {
  box-shadow: none !important;
}

.music-box-lyric-card {
  box-shadow: none !important;
}

.lyric-hover {
  animation: displayTime ease-in-out .5s;
}

.music-list {
  scrollbar-width: none;
}

.music-list-item-hover {
  animation: displayTime ease-in-out .5s;
}

@keyframes displayTime {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.lyric-content {
  transition: 1s;
  transform: scale(.9);
}

.lyric-content-active {
  transform: scale(1.2);
}

.lyric-content-mobile {
  transition: 1s;
  transform: scale(.6);
}

.lyric-content-active-mobile {
  transform: scale(.8);
}
</style>
