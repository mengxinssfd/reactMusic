import {mapGetters, mapActions, mapMutations} from 'vuex';
import * as types from '../../store/mutation-type';
import {playMode} from '../../store/config';

export const playListMixin = {
  computed: {
    ...mapGetters(['playList'])

  },
  mounted() {
    this.handlePlayList(this.playList);
  },
  activated() {
    this.handlePlayList(this.playList);
  },
  watch: {
    playList(newVal) {
      this.handlePlayList(newVal);
    }
  },
  methods: {
    handlePlayList() {
      throw new Error('component must implement handlePlayList method');
    }
  }
};

export const playerMixin = {
  computed: {
    ...mapGetters(['favoriteList', 'mode', 'currentSong', 'sequenceList', 'playList']),
    currentIsFavorite() {
      return this.isFavorite(this.currentSong);
    },
    getModeClass() {
      return this.mode === playMode.random ? 'icon-shuffle' : this.mode === playMode.sequence ? 'icon-sequence' : 'icon-infinite';
    },
    getModeName() {
      return this.mode === playMode.random ? '随机播放' : this.mode === playMode.sequence ? '顺序播放' : '单曲循环';
    }
  },
  methods: {
    ...mapActions(['favoriteAddOne', 'favoriteDeleteOne']),
    ...mapMutations({setMode: types.SET_MODE}),
    isFavorite(song) {
      let index = this.favoriteList.findIndex((item) => {
        return item.id === song.id;
      });
      return index > -1;
    },
    changeFavorite(song) {
      if (this.isFavorite(song)) {
        this.favoriteDeleteOne(song);
      } else {
        this.favoriteAddOne(song);
      }
    }
  }
};
