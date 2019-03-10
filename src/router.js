import recommend from './pages/recommend/recommend';
import singer from './pages/singer/singer';
import rank from './pages/rank/rank';
import search from './pages/search/search';

export const routers = [
  {
    name: '推荐',
    isTab: true,
    exact: true,
    path: '/recommend',
    component: recommend,
  },
  {
    name: '歌手',
    isTab: true,
    exact: true,
    path: '/singer',
    component: singer,
  },
  {
    name: '排行',
    isTab: true,
    exact: true,
    path: '/rank',
    component: rank,
  },
  {
    name: '搜索',
    isTab: true,
    exact: true,
    path: '/search',
    component: search,
  },
];
