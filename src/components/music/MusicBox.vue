<script>
import {mapActions, mapState} from "pinia";
import {useMusicStore} from "@/stores/music";

export default {
  name: 'MusicBox',
  props: {
    showMusicBox: {
      type: Boolean,
      default: false,
    },
    // musicList: {
    //   type: Array,
    //   default: [],
    // }
  },
  setup() {
    // const {} = useDate();
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      const audio = this.$refs["internal-audio"];
      // 设置是否自动播放
      audio.autoplay = this.autoplay;
      // 设置默认音量
      audio.volume = this.deformattingVolume(this.volume);
    });
    /////
    // todo 初始化 通过API获取音乐List在 launch函数中做(获取第一页数据即可)
    /////
    this.loadMusicList().then(value => {
      this.musicList = value;
      // alert(JSON.stringify(this.musicList));
      this.currentPlayIndex = 0;
    });
  },
  data: () => ({
    visible: false,
    musicList: [],
    currentPlayIndex: null,
    // 正在播放的音乐
    musicBeingPlayed: {
      id: null,
      // 名称
      name: '未知歌曲',
      // 歌唱者
      singer: '未知歌手',
      // 歌词
      lyrics: '',
      // 音乐地址
      src: null,
    },
    // 是否显示音量调
    showVolumeSlider: true,
    // 播放状态
    play: false,
    // 自动播放
    autoplay: false,
    // 音量
    volume: 50,
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
    showLyricsLoadingOverlay: false,
    showLyricsPanel: false,
    // 歌词是否解析过
    // lyricsParsed: false,
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
    interruptTimeoutId: null,
    interruptLyricScroll: false,
    // 以下属性可能移除
    tempLyric: {
      // 样式中移除的歌词
      removedLyrics: [],
    },
    lyricItem: {
      old: 0,
      height: 10,
      width: 0,
    },
  }),
  computed: {
    ...mapState(useMusicStore, ['musics']),
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
        // return currentItem === this.activeLyricItemId ? 'text-high-emphasis' : 'text-medium-emphasis';
        return currentItem === this.activeLyricItemId ? 'text-primary lyric-active' : 'text-medium-emphasis';
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
  },
  watch: {
    showMusicBox(value) {
      this.visible = value;
    },
    visible(value) {
      this.visible = value;
      this.$emit('visibleChange', value);
    },
    // 检测play的值来控制 audio是否开始播放还是暂停
    play() {
      let audio = this.$refs["internal-audio"];
      if (this.getPlayStatus === 'pause') {
        audio.pause();
        return;
      }
      try {
        audio.play().then(value => {
          console.log('audio 开始播放 ~', value);
        }).catch(reason => {
          // alert(reason);
          console.log('audio 播放失败 !', reason);
        });
      } catch (e) {
        console.log(e);
      }
    },
    //v-progress-linear 生成的是整数
    playbackProgressPercentage(value) {
      let audio = this.$refs["internal-audio"];
      value = value / 100;
      audio.currentTime = value * this.duration;
    },
    // 实际切歌逻辑
    async currentPlayIndex(newIndex) {
      if (this.showLyricsPanel) this.showLyricsLoadingOverlay = true;
      const {id, name, singer, src_url, lyric_url} = this.musicList.at(newIndex);
      this.musicBeingPlayed = {id, name, singer};
      this.musicBeingPlayed['src'] = await this.loadMusicFileContentAsURL(src_url);
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
      // todo this.musicBeingPlayed['lyrics'] 需要赋值
      this.currentParsedLyrics = cache;
      this.showLyricsLoadingOverlay = false;
    },
  },
  methods: {
    ...mapActions(useMusicStore, ['loadMusicList', 'loadLyricsFileContentByURL', 'loadMusicFileContentAsURL']),
    getMusicFileHrefFromAssets(fileName, typeName) {
      return new URL(`../../assets/music/${fileName}.${typeName}`, import.meta.url).href;
    },
    getLyricFileHrefFromAssets(fileName, typeName) {
      return new URL(`../../assets/music/lyric/${fileName}.${typeName}`, import.meta.url).href;
    },
    getMusicMetaHrefFromAssets() {
      return new URL(`../../assets/music/config/meta.json`, import.meta.url).href;
    },
    //播放前一首
    playPrevMusic() {
      this.currentPlayIndex--;
    },
    //播放下一首
    playNextMusic() {
      this.currentPlayIndex++;
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
      let audio = this.$refs["internal-audio"];
      audio.volume = this.deformattingVolume(volume);
    },

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
      console.log('音乐播放完成~');
      this.play = false;
      // todo 同一首歌需要重置之前移除的歌词
      // const tempLyric = this.tempLyric;
      // tempLyric.removedLyrics = [];
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
      this.activateTheLyricsStyle_();
    },

    // 下载数据时会触发 progress 事件，如果我们想要显示下载或缓冲进度，这是一个很好的用于做出反应的事件。
    // -- developer.mozilla.org
    /**
     * 关于Audio的事件回调-正在下载数据
     * @param e
     */
    onProgressAtAudio(e) {
      const audio = e.target;
      for (let i = 0; i < audio.buffered.length; i++) {
        const endTime = audio.buffered.end(audio.buffered.length - 1);
        // console.log(endTime,this.duration,audio.duration);
        // 问题：使用this.duration属性并切歌时导致当前音乐的缓冲时间滞留在上一首的缓冲总时间
        // 分析：框架渲染时，优先于onProgressAtAudio，导致数据为旧数据
        this.bufferedProgress = (endTime / audio.duration) * 100;
      }
    },

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

    /*
      [ti:Try]
      [ar:Marlisa]
      [al:Marlisa]
      [by:]
      [offset:0]
      [00:00.00]Try (尝试) - Marlisa
      [00:23.46]Ever wonder about what he&apos;s doing
      [00:26.22]
      [00:27.77]How it all turned to lies
      [00:29.94]
      [00:32.67]Sometimes I think that it&apos;s better
      ...
      [03:40.38]Gotta get up and try  and try  and try
   */

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
              result['by'] = val.length === 0 ? '未知' : val;
              break;
            case 'offset':
              result['offset'] = val;
              break;
            default : {
              result['other'] = val;
              console.info('无法转换的格式，可能是未能考虑到这个格式!');
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
     * 解析时间
     * @param timeString
     * @returns {string}
     */
    parseTimeStringToSeconds(timeString) {
      // 去括号[]
      timeString = timeString.substring(1, timeString.length - 1);
      // 获取分段索引
      const index = timeString.search(':');
      // 获取分钟
      let minutes = parseInt(timeString.substring(0, index));
      // 获取秒数
      let seconds = parseFloat(timeString.substring(index + 1, timeString.length));
      minutes *= 60;
      return parseFloat(seconds += minutes).toFixed(2);
    },

    /**
     * 根据当前时间获取应该激活歌词样式的歌词项的id
     * @returns {number}
     */
    async activateTheLyricsStyle_() {
      try {
        this.currentParsedLyrics.data.forEach(({id, time}) => {
          if (this.currentTime >= time) {
            this.activeLyricItemId = id;
            if (this.interruptLyricScroll) return;
            const element = document.getElementById(id);
            element.scrollIntoView({behavior: "smooth", block: 'center'});
          }
        });
      } catch (e) {
        // console.log(e);
        return -1;
      }
      return 0;
    },

    debounce(func, delay) {
      let timeout;
      return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
      };
    },

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
      if (this.interruptTimeoutId != null) clearTimeout(this.interruptTimeoutId);
      this.interruptLyricScroll = true;
      this.interruptTimeoutId = setTimeout(() => {
        this.interruptLyricScroll = false;
      }, 2000);
    },

    /**
     * 根据当前时间激活歌词样式
     * @returns {number}
     * @deprecated
     */
    activateTheLyricsStyle() {
      // if (!this.lyricsParsed) return;
      const removedLyrics = this.tempLyric.removedLyrics;
      // const element = document.getElementById('lyrics-container');
      //
      // // element.setAttribute('style','transform: translateY(350px)')
      // // console.log(element)
      //
      // var transform = element.style.transform;
      //
      // element.style.transform = `translateY(${this.old -= 10}px)`;
      // // document.querySelector('#lyrics-parent-container');
      try {
        this.currentParsedLyrics.data.forEach(({id, time, content}) => {
          // console.info('当前歌词项-> ' + `#${id}`);
          // 需要迭代所有歌词项，要考虑到点击进度条的情况
          // 如果播放器的时间大于了一句歌词的时间也就是time,则开始激活样式
          if (content.length === 0) return;
          if (this.currentTime >= time) {
            // 当前时间大于该歌词项的时间时，但是歌词id一样就不能操作
            if (removedLyrics.length > 0) {
              if (id !== removedLyrics[removedLyrics.length - 1].id) {
                const lyricElement = document.querySelector(`#${id}`);
                lyricElement.classList.add('text-primary');
                // 移除之前的样式
                if (removedLyrics.length > 0) {
                  const lastRemovedLyricItem = `#${removedLyrics[removedLyrics.length - 1].id}`;
                  const beforeLyricItem = document.querySelector(lastRemovedLyricItem);
                  beforeLyricItem.classList.remove('text-primary');
                }
                removedLyrics.push({
                  id: id,
                  time: time,
                });
              }
              return;
            }
            // 第一次设置歌词样式 (特例)
            const lyricElement = document.querySelector(`#${id}`);
            lyricElement.classList.add('text-primary');
            removedLyrics.push({
              id: id,
              time: time,
            });
          }
        });
      } catch (e) {
        console.log(e);
        return -1;
      }
      return 0;
    },

    /**
     * 点击歌词项跳转至对应的时间点
     * @param toggle
     * @param time
     */
    goToCurrentTimeByTime(toggle, time) {
      toggle();
      let audio = this.$refs["internal-audio"];
      audio.currentTime = time;
    },
  },
}
</script>
<template>
  <!-- audio 不能放在vuetify 组件内部，可能会在未渲染完成时操作dom -->
  <audio
    class="d-none"
    id="internal-audio"
    ref="internal-audio"
    :src="musicBeingPlayed.src"
    @canplay="onMusicCanplayAtAudio"
    @progress="onProgressAtAudio"
    @timeupdate="onTimeUpdateAtAudio"
    @ended="onMusicPlayEndedAtAudio"
  />
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
    <v-expand-transition>
      <v-container
        v-if="showLyricsPanel"
        id="lyrics-parent-container"
        class="position-relative overflow-x-hidden rounded"
        :class="{'bg-surface': $vuetify.theme.name !== 'shadowTheme'}">
        <v-overlay
          v-model="showLyricsLoadingOverlay"
          class="align-center justify-center"
          contained
          persistent>
          <v-progress-circular color="primary" indeterminate/>
          <span class="pl-5 font-weight-bold text-caption">正在加载歌词...</span>
        </v-overlay>
        <!--    歌词信息开始    -->
        <v-container class="h-25 d-flex flex-column align-center justify-center bg-transparent">
          <div class="text-center">
            <div class="text-h4 text-capitalize">
              {{ currentParsedLyrics.title }}
            </div>
            <div class="pt-5 text-subtitle-2 d-flex align-center flex-column gr-1">
              <div class="d-inline-flex gc-1">
                <v-icon>mdi-album</v-icon>
                {{ currentParsedLyrics.album }}
              </div>
              <div class="d-inline-flex gc-1">
                <v-icon>mdi-microphone</v-icon>
                {{ currentParsedLyrics.author }}
              </div>
              <div class="d-flex gc-5 text-caption">
                <div class="d-inline-flex gc-1">
                  <v-icon>mdi-pencil-outline</v-icon>
                  {{ currentParsedLyrics.by }}
                </div>
                <div class="d-inline-flex gc-1">
                  <v-icon>mdi-location-enter</v-icon>
                  {{ currentParsedLyrics.offset }}
                </div>
              </div>
            </div>
          </div>
        </v-container>
        <!--    歌词信息结束    -->

        <!--    歌词 item 开始    -->
        <v-container
          id="lyrics-container"
          class="h-75 overflow-y-hidden border-t"
          @wheel.prevent.stop="onWheelLyricsScroll">
          <v-item-group id="lyrics-item-group" selected-class="text-primary">
            <template v-if="currentParsedLyrics.data.length !== 0">
              <template v-for="({id,time,displayTime,content}) in currentParsedLyrics.data">
                <v-item #default="{ isSelected, selectedClass,toggle }">
                  <v-hover #default="{isHovering,props}">
                    <v-card
                      v-bind="props"
                      color="transparent"
                      class="music-box-lyric-card"
                      :class="['d-flex align-center public-transition', selectedClass]"
                      :id="id"
                      @click="goToCurrentTimeByTime(toggle,time)">
                      <template #subtitle>
                        <span v-text="displayTime"/>
                      </template>
                      <div class="d-flex align-center gc-3">
                        <div class="d-flex align-center">
                          <v-scale-transition>
                            <v-icon v-if="id === activeLyricItemId" color="primary"
                                    icon="mdi-arrow-right-bold-outline"/>
                          </v-scale-transition>
                        </div>
                        <div :class="getActiveLyricItemStyle(id)" v-html="content"/>
                      </div>
                      <template #actions>
                        <v-scale-transition>
                          <div v-if="isHovering && id !== activeLyricItemId" class="d-inline-flex gc-1">
                            <v-icon color="primary" icon="mdi-arrow-left-bold-outline"/>
                            {{ `${time}s` }}
                          </div>
                        </v-scale-transition>
                      </template>
                    </v-card>
                  </v-hover>
                </v-item>
              </template>
            </template>
            <template v-else>
              <template v-for="(item) in currentParsedLyrics.other">
                <v-item>
                  <v-card
                    color="transparent"
                    class="music-box-lyric-card"
                    :title="item"
                  />
                </v-item>
              </template>
            </template>
          </v-item-group>
        </v-container>
      </v-container>
      <!--    歌词item结束    -->
    </v-expand-transition>
    <!--  歌词box结束  -->

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
      <v-list
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
          </template>
          <!--   播放器按钮开始   -->
        </v-list-item>
      </v-list>
    </v-sheet>
    <!--  操作台box结束  -->
  </v-bottom-sheet>
</template>
<style lang="scss">
@import '@/styles/main';

#lyrics-parent-container {
  height: 100dvh;
  box-shadow: 0 11px 15px -7px inset rgb(var(--v-theme-primary)) !important;
}

#lyrics-item-group {
  transform: translateY(250px);
  //margin-top: 100px;
}

.music-box {
  box-shadow: none !important;
}

.music-box-lyric-card {
  box-shadow: none !important;
}

.lyric-active {
  transform: scale(1.2);
  margin-inline: 50px 0;
}
</style>
