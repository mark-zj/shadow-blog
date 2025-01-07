// Utilities
import {defineStore} from 'pinia'
import api from '@/api/index'

export const useMusicStore = defineStore('music', {
  actions: {
    loadMusicList() {
      return api.App.getMusicList().then(value => {
        // console.log(value);
        this.musics = value.data;
        return value.data;
      }).catch(reason => {
        console.error(reason);
      });
    },
    loadLyricsFileContentByURL(url) {
      return api.App.getLyricsFileContent(url).then(value => {
        return value;
      }).catch(reason => {
        console.error(reason);
      });
    },
    loadMusicFileContentAsURL(url) {
      return api.App.getMusicFileContent(url).then(value => {
        return URL.createObjectURL(value);
      }).catch(error => {
        console.error(`获取${url}失败`, error);
      });
    }
  },
  state: () => ({
    currentId: 0,
    musics: [
      // {
      //   id: 0,
      //   name: 'Sugar',
      //   singer: 'Maroon 5',
      //   src: 'Maroon 5 - Sugar',
      //   type: 'flac',
      //   lyrics: '',
      // },
      // {
      //   id: 1,
      //   name: 'Try',
      //   singer: 'Marlisa',
      //   src: 'Marlisa - Try',
      //   type: 'mp3',
      //   lyrics: '[ti:Try]\n' +
      //     '[ar:Marlisa]\n' +
      //     '[al:Marlisa]\n' +
      //     '[by:]\n' +
      //     '[offset:0]\n' +
      //     '[00:00.00]Try (尝试) - Marlisa\n' +
      //     '[00:23.46]Ever wonder about what he&apos;s doing \n' +
      //     '[00:26.22]\n' +
      //     '[00:27.77]How it all turned to lies \n' +
      //     '[00:29.94]\n' +
      //     '[00:32.67]Sometimes I think that it&apos;s better\n' +
      //     '[00:35.68]\n' +
      //     '[00:36.64]To never ask why\n' +
      //     '[00:38.73]\n' +
      //     '[00:49.76]Where there is desire\n' +
      //     '[00:51.62]There is gonna be a flame\n' +
      //     '[00:53.76]\n' +
      //     '[00:54.27]Where there is a flame\n' +
      //     '[00:56.08]Someone&apos;s bound to get burned\n' +
      //     '[00:58.74]But just because it burns\n' +
      //     '[01:00.69]Doesn&apos;t mean you&apos;re gonna die\n' +
      //     '[01:03.35]You&apos;ve gotta get up and try  and try  and try\n' +
      //     '[01:07.62]\n' +
      //     '[01:08.23]Gotta get up and try  and try  and try\n' +
      //     '[01:12.60]You gotta get up and try  and try  and try\n' +
      //     '[01:16.92]\n' +
      //     '[01:18.78]You&apos;ve get up and try\n' +
      //     '[01:21.60]\n' +
      //     '[01:25.57]Funny how the heart can be deceiving\n' +
      //     '[01:28.56]\n' +
      //     '[01:29.96]More than just a couple times\n' +
      //     '[01:32.08]\n' +
      //     '[01:35.08]Why do we fall in love so easy \n' +
      //     '[01:37.94]\n' +
      //     '[01:39.53]Even when it&apos;s not right\n' +
      //     '[01:41.54]\n' +
      //     '[01:52.16]Where there is desire\n' +
      //     '[01:53.81]There is gonna be a flame\n' +
      //     '[01:55.93]\n' +
      //     '[01:56.54]Where there is a flame\n' +
      //     '[01:58.32]Someone&apos;s bound to get burned\n' +
      //     '[02:01.02]But just because it burns\n' +
      //     '[02:02.91]Doesn&apos;t mean you&apos;re gonna die\n' +
      //     '[02:05.61]You&apos;ve gotta get up and try  and try  and try\n' +
      //     '[02:09.84]\n' +
      //     '[02:10.42]Gotta get up and try  and try  and try\n' +
      //     '[02:15.00]You gotta get up and try  and try  and try\n' +
      //     '[02:19.61]\n' +
      //     '[02:20.82]Gotta get up and try\n' +
      //     '[02:24.92]\n' +
      //     '[02:27.99]Ever worry that it might be ruined\n' +
      //     '[02:31.07]\n' +
      //     '[02:32.45]Does it make you wanna cry \n' +
      //     '[02:35.24]\n' +
      //     '[02:36.95]When you&apos;re out there doing what you&apos;re doing\n' +
      //     '[02:40.25]\n' +
      //     '[02:41.64]Are you just getting by \n' +
      //     '[02:44.95]\n' +
      //     '[02:45.63]Tell me are you just getting by  by  by \n' +
      //     '[02:50.02]Where there is desire\n' +
      //     '[02:51.44]There is gonna be a flame\n' +
      //     '[02:54.23]Where there is a flame\n' +
      //     '[02:56.02]Someone&apos;s bound to get burned\n' +
      //     '[02:58.72]But just because it burns\n' +
      //     '[03:00.57]Doesn&apos;t mean you&apos;re gonna die\n' +
      //     '[03:03.32]You&apos;ve gotta get up and try  and try  and try\n' +
      //     '[03:07.41]\n' +
      //     '[03:07.95]Where there is desire\n' +
      //     '[03:09.74]There is gonna be a flame\n' +
      //     '[03:12.11]\n' +
      //     '[03:12.66]Where there is a flame\n' +
      //     '[03:14.44]Someone&apos;s bound to get burned\n' +
      //     '[03:17.17]But just because it burns\n' +
      //     '[03:19.08]Doesn&apos;t mean you&apos;re gonna die\n' +
      //     '[03:21.70]You&apos;ve gotta get up and try  and try  and try\n' +
      //     '[03:26.02]\n' +
      //     '[03:26.57]Gotta get up and try  and try  and try\n' +
      //     '[03:31.11]Gotta get up and try  and try  and try\n' +
      //     '[03:35.91]Gotta get up and try  and try  and try\n' +
      //     '[03:40.38]Gotta get up and try  and try  and try',
      // },
      // {
      //   id: 2,
      //   name: 'Solo Dance',
      //   singer: 'Martin Jensen',
      //   src: 'Martin Jensen - Solo Dance',
      //   type: 'flac',
      //   lyrics:'[ti:Solo Dance]\n' +
      //     '[ar:Martin Jensen]\n' +
      //     '[al:Solo Dance]\n' +
      //     '[by:]\n' +
      //     '[offset:0]\n' +
      //     '[00:00.00]Solo Dance - Martin Jensen\n' +
      //     '[00:00.97]Written by：Martin Jensen/Peter Bjørnskov/Lene Dissing/Mads Dyhrberg\n' +
      //     '[00:01.94]In the faded light you touch my body\n' +
      //     '[00:04.88]\n' +
      //     '[00:06.14]I can feel your hands on my skin\n' +
      //     '[00:09.41]\n' +
      //     '[00:10.37]Think you got me right where you want me\n' +
      //     '[00:13.51]\n' +
      //     '[00:14.39]But you&apos;re just in my way\n' +
      //     '[00:17.36]I came to party on my own\n' +
      //     '[00:20.55]\n' +
      //     '[00:21.33]Don&apos;t need nobody in my zone\n' +
      //     '[00:24.62]\n' +
      //     '[00:25.44]I can dance with the beat I lose control\n' +
      //     '[00:28.88]\n' +
      //     '[00:29.43]Hey oh I go so solo\n' +
      //     '[00:33.88]\n' +
      //     '[00:34.96]Boy you can cool it down\n' +
      //     '[00:37.03]Not here to fool around\n' +
      //     '[00:39.13]Just wanna dance dance dance\n' +
      //     '[00:41.66]Dance dance dance\n' +
      //     '[00:43.59]I know you want me\n' +
      //     '[00:45.37]But I don&apos;t care baby\n' +
      //     '[00:47.48]Just wanna dance dance dance\n' +
      //     '[00:49.99]Dance dance dance\n' +
      //     '[00:51.82]\n' +
      //     '[00:58.59]Dance dance dance\n' +
      //     '[01:00.27]\n' +
      //     '[01:06.83]Dance dance dance\n' +
      //     '[01:08.55]\n' +
      //     '[01:15.34]Dance dance dance\n' +
      //     '[01:16.90]\n' +
      //     '[01:27.65]In the shade of night you&apos;re moving closer\n' +
      //     '[01:30.61]\n' +
      //     '[01:31.57]We&apos;re on our way to cross the line\n' +
      //     '[01:34.70]\n' +
      //     '[01:35.87]Think you got me right where you want me\n' +
      //     '[01:38.92]\n' +
      //     '[01:40.02]But it&apos;s all in your mind\n' +
      //     '[01:42.92]I came to party on my own\n' +
      //     '[01:46.07]\n' +
      //     '[01:46.87]Don&apos;t need nobody in my zone\n' +
      //     '[01:50.15]\n' +
      //     '[01:50.98]I can dance with the beat I lose control\n' +
      //     '[01:54.93]Hey oh I go so solo\n' +
      //     '[01:59.36]\n' +
      //     '[02:00.41]Boy you can cool it down\n' +
      //     '[02:02.55]Not here to fool around\n' +
      //     '[02:04.74]Just wanna dance dance dance\n' +
      //     '[02:07.30]Dance dance dance\n' +
      //     '[02:09.26]I know you want me\n' +
      //     '[02:10.91]But I don&apos;t care baby\n' +
      //     '[02:13.03]Just wanna dance dance dance\n' +
      //     '[02:15.72]Dance dance dance\n' +
      //     '[02:17.29]\n' +
      //     '[02:24.18]Dance dance dance\n' +
      //     '[02:25.68]\n' +
      //     '[02:32.37]Dance dance dance\n' +
      //     '[02:34.11]\n' +
      //     '[02:41.01]Dance dance dance',
      // },
      // {
      //   id: 3,
      //   name: 'One Day',
      //   singer: 'MatisYahu',
      //   src: 'MatisYahu - One Day',
      //   type: 'flac',
      //   lyrics: '[ti:One Day]\n' +
      //     '[ar:MatisYahu/Akon]\n' +
      //     '[al:Light]\n' +
      //     '[by:]\n' +
      //     '[offset:0]\n' +
      //     '[00:00.00]One Day (一天) - MatisYahu\n' +
      //     '[00:04.77]Lyrics by：Philip Lawr\n' +
      //     '[00:09.54]Composed by：Philip Lawr\n' +
      //     '[00:14.31]Sometimes I lay under the moon\n' +
      //     '[00:17.86]And thank god I\'m breathing\n' +
      //     '[00:20.11]\n' +
      //     '[00:20.94]Then I pray don\'t take me soon\n' +
      //     '[00:24.27]\'Cause I am here for a reason\n' +
      //     '[00:27.05]Sometimes in my tears I drown\n' +
      //     '[00:28.77]\n' +
      //     '[00:29.89]But I never let it get me down\n' +
      //     '[00:31.98]\n' +
      //     '[00:32.99]So when negativity surrounds\n' +
      //     '[00:35.55]\n' +
      //     '[00:36.34]I know some day it\'ll all turn around\n' +
      //     '[00:39.64]Because\n' +
      //     '[00:40.21]All my life I\'ve been waiting for\n' +
      //     '[00:42.43]\n' +
      //     '[00:42.98]I\'ve been praying for\n' +
      //     '[00:44.51]For the people to say\n' +
      //     '[00:46.84]That we don\'t wanna fight no more\n' +
      //     '[00:49.52]There\'ll be no more war\n' +
      //     '[00:51.11]And our children will play\n' +
      //     '[00:53.40]One day one day one day\n' +
      //     '[00:59.37]\n' +
      //     '[00:59.91]One day one day one day\n' +
      //     '[01:05.99]\n' +
      //     '[01:07.28]It\'s not about win or lose\n' +
      //     '[01:10.72]Cause we all lose when they feed on the souls of the innocent\n' +
      //     '[01:14.89]Blood drenched pavement\n' +
      //     '[01:16.53]Keep on moving though the waters stay raging\n' +
      //     '[01:19.70]\n' +
      //     '[01:20.72]In this maze you can lose your ways your way\n' +
      //     '[01:26.02]It might drive you crazy but don\'t let it faze you no way\n' +
      //     '[01:30.27]\n' +
      //     '[01:30.92]No way\n' +
      //     '[01:31.84]\n' +
      //     '[01:33.08]Sometimes in my tears I drown\n' +
      //     '[01:35.18]I drown\n' +
      //     '[01:36.19]But I never let it get me down\n' +
      //     '[01:38.41]Get me down\n' +
      //     '[01:39.37]So when negativity surrounds\n' +
      //     '[01:41.89]Surrounds\n' +
      //     '[01:42.71]I know some day it\'ll all turn around\n' +
      //     '[01:45.81]Because\n' +
      //     '[01:46.45]All my life I\'ve been waiting for\n' +
      //     '[01:49.14]I\'ve been praying for\n' +
      //     '[01:50.69]For the people to say\n' +
      //     '[01:52.88]That we don\'t wanna fight no more\n' +
      //     '[01:55.33]\n' +
      //     '[01:55.87]There\'ll be no more war\n' +
      //     '[01:57.33]And our children will play\n' +
      //     '[01:59.64]One day one day one day\n' +
      //     '[02:05.52]\n' +
      //     '[02:06.08]One day one day one day\n' +
      //     '[02:12.73]One day this all will change\n' +
      //     '[02:14.25]Treat people the same\n' +
      //     '[02:15.95]Stop with the violence\n' +
      //     '[02:17.64]Down with the hate\n' +
      //     '[02:19.43]One day we\'ll all be free\n' +
      //     '[02:21.11]And proud to be under the same sun\n' +
      //     '[02:24.37]Singing songs of freedom like\n' +
      //     '[02:25.98]Why ohh\n' +
      //     '[02:27.73]One day one day\n' +
      //     '[02:30.05]\n' +
      //     '[02:32.00]Ohh why\n' +
      //     '[02:33.91]One day one day\n' +
      //     '[02:36.35]\n' +
      //     '[02:38.50]Ohh\n' +
      //     '[02:39.36]All my life I\'ve been waiting for\n' +
      //     '[02:42.09]I\'ve been praying for\n' +
      //     '[02:43.78]For the people to say\n' +
      //     '[02:45.88]That we don\'t wanna fight no more\n' +
      //     '[02:48.24]\n' +
      //     '[02:48.77]There\'ll be no more war\n' +
      //     '[02:50.42]And our children will play\n' +
      //     '[02:52.50]One day one day one day\n' +
      //     '[02:58.05]\n' +
      //     '[02:59.03]One day one day one day',
      // },
      // {
      //   id: 4,
      //   name: 'Sold Out',
      //   singer: 'Hawk Nelson',
      //   src: 'Hawk Nelson - Sold Out',
      //   type: 'flac',
      //   lyrics: '[ti:Sold Out]\n' +
      //     '[ar:Hawk Nelson]\n' +
      //     '[al:Diamonds]\n' +
      //     '[by:]\n' +
      //     '[offset:0]\n' +
      //     '[00:00.00]Sold Out - Hawk Nelson\n' +
      //     '[00:00.40]Hoo hoo hoo hey\n' +
      //     '[00:08.39]Hoo hoo hoo hey\n' +
      //     '[00:16.23]I ain\'t like no one you met before\n' +
      //     '[00:20.08]I\'m running for the front\n' +
      //     '[00:21.61]When they\'re all running for the door\n' +
      //     '[00:23.84]And I won\'t sit down won\'t back out\n' +
      //     '[00:26.21]You can\'t ever shut me up\n' +
      //     '[00:28.05]\'Cause I\'m on a mission\n' +
      //     '[00:29.77]And I won\'t quit now\n' +
      //     '[00:31.80]In a world full of followers\n' +
      //     '[00:34.31]I\'ll be a leader\n' +
      //     '[00:35.75]In a world full of doubters\n' +
      //     '[00:37.74]I\'ll be a believer\n' +
      //     '[00:39.88]\n' +
      //     '[00:40.41]I\'m stepping out without a hesitation\n' +
      //     '[00:43.59]\n' +
      //     '[00:44.53]Because the battle\'s already been won\n' +
      //     '[00:47.77]I\'m sold out\n' +
      //     '[00:49.44]\n' +
      //     '[00:49.98]I\'m no longer living\n' +
      //     '[00:51.85]Just for myself\n' +
      //     '[00:54.09]Running after Jesus\n' +
      //     '[00:55.77]With my whole heart\n' +
      //     '[00:57.70]\n' +
      //     '[00:58.44]And now I\'m ready to show\n' +
      //     '[01:01.08]I am sold out\n' +
      //     '[01:03.25]\n' +
      //     '[01:03.80]I\'m sold out\n' +
      //     '[01:05.81]With every single\n' +
      //     '[01:07.32]Step that I take now\n' +
      //     '[01:09.83]With every drop of blood\n' +
      //     '[01:11.69]Left in my veins\n' +
      //     '[01:12.94]I\'m gonna be making it count\n' +
      //     '[01:16.65]\n' +
      //     '[01:17.25]I am sold out\n' +
      //     '[01:19.57]\n' +
      //     '[01:20.31]This ain\'t just some temporary phase\n' +
      //     '[01:24.15]You can\'t face this kind of grace\n' +
      //     '[01:26.12]And leave the way you came\n' +
      //     '[01:27.83]This is permanent with intent\n' +
      //     '[01:30.05]And there won\'t be no stopping it now\n' +
      //     '[01:32.63]I\'m on a mission and it\'s heaven sent\n' +
      //     '[01:35.82]In a world full of followers\n' +
      //     '[01:38.24]I\'ll be a leader\n' +
      //     '[01:39.90]In a world full of doubters\n' +
      //     '[01:41.85]I\'ll be a believer\n' +
      //     '[01:44.43]I\'m stepping out without a hesitation\n' +
      //     '[01:48.07]\n' +
      //     '[01:48.58]\'Cause my soul is like a stadium\n' +
      //     '[01:51.75]I\'m sold out\n' +
      //     '[01:54.05]I\'m no longer living\n' +
      //     '[01:55.80]Just for myself\n' +
      //     '[01:57.61]\n' +
      //     '[01:58.15]Running after Jesus\n' +
      //     '[01:59.77]With my whole heart\n' +
      //     '[02:01.71]\n' +
      //     '[02:02.45]And now I\'m ready to show\n' +
      //     '[02:04.66]\n' +
      //     '[02:05.28]I am sold out\n' +
      //     '[02:07.88]I\'m sold out\n' +
      //     '[02:09.87]With every single\n' +
      //     '[02:11.36]Step that I take now\n' +
      //     '[02:13.89]With every drop of blood\n' +
      //     '[02:15.61]Left in my veins\n' +
      //     '[02:16.97]I\'m gonna be making it count\n' +
      //     '[02:20.68]\n' +
      //     '[02:21.26]I am sold out\n' +
      //     '[02:23.66]\n' +
      //     '[02:25.53]No trials coming against me\n' +
      //     '[02:29.04]\n' +
      //     '[02:29.63]Could put a dent in my passion\n' +
      //     '[02:32.83]\n' +
      //     '[02:33.46]They\'re just an opportunity\n' +
      //     '[02:37.51]To put my faith into action\n' +
      //     '[02:39.86]In a world full of followers\n' +
      //     '[02:42.34]I\'ll be a leader\n' +
      //     '[02:43.95]In a world full of doubters\n' +
      //     '[02:45.82]I\'ll be a believer\n' +
      //     '[02:48.01]\n' +
      //     '[02:48.53]I\'m stepping out without a hesitation\n' +
      //     '[02:51.68]\n' +
      //     '[02:52.49]I ain\'t got nothing left to be afraid\n' +
      //     '[02:55.86]I\'m sold out yeah\n' +
      //     '[02:58.06]I\'m no longer living\n' +
      //     '[02:59.83]Just for myself\n' +
      //     '[03:01.58]\n' +
      //     '[03:02.14]Running after Jesus\n' +
      //     '[03:03.75]With my whole heart yeah\n' +
      //     '[03:05.98]\n' +
      //     '[03:06.49]And now I\'m ready to show\n' +
      //     '[03:08.67]\n' +
      //     '[03:09.26]I am sold out\n' +
      //     '[03:11.83]I\'m sold out\n' +
      //     '[03:14.00]With every single\n' +
      //     '[03:15.23]Step that I take now\n' +
      //     '[03:17.90]With every drop of blood\n' +
      //     '[03:19.70]Left in my veins\n' +
      //     '[03:20.84]I\'m gonna be making it count\n' +
      //     '[03:24.76]\n' +
      //     '[03:25.32]I am sold out\n'
      // },
    ],
  }),
})
