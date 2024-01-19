<script setup lang="ts">
  import { nextTick, onMounted, reactive, ref, watch } from 'vue';
  import { getDocumentHeight, getQueryStringByName, getScrollTop, getWindowHeight, throttle } from '../../utils';
  import EndLoading from '../../components/EndLoading.vue';
  import Loading from '../../components/Loading.vue';
  import { Article, ArticleArray, ArticleParams } from '../../types';
  import { getArticleList } from '../../api/service';
  import ArticleList from '../../components/ArticleList.vue';
  import { useStore } from '../../store';

  const store = useStore();
  const state = reactive({
    isLoadEnd: false,
    isLoading: false,
    articlesList: [] as Array<Article>,
    total: 0,
    tag_name: decodeURI(getQueryStringByName('tag_name')),
    params: {
      title: undefined,
      tags: undefined,
      catalog: undefined,
      page: 1,
      page_size: 10
    } as ArticleParams
  });

  // 获取可视区域的高度
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;

  //图片懒加载
  const lazyload = throttle(() => {
    const imgs = document.querySelectorAll('#list .item img');
    let num = 0;
    for (let i = num; i < imgs.length; i++) {
      // 用可视区域高度减去元素顶部距离可视区域顶部的高度
      let distance = viewHeight - imgs[i].getBoundingClientRect().top;
      let imgItem: any = imgs[i];
      // 露出高度超过100px
      if (distance >= 100) {
        // 给元素写入真实的 src，展示图片
        let hasLaySrc = imgItem.getAttribute('data-has-lazy-src');
        if (hasLaySrc === 'false') {
          imgItem.src = imgItem.getAttribute('data-src');
          imgItem.setAttribute('data-has-lazy-src', 'true');
        }
        // 前 i 张图片已经加载完毕，下次从第 i+1 张开始检查是否露出
        num = i + 1;
      }
    }
  }, 1000);
  //给元素写入真实的 src 了之后，把 data-has-lazy-src 设置为 true ，
  //是为了避免回滚的时候再设置真实的 src 时，浏览器会再请求这个图片一次，白白浪费服务器带宽。

  watch(
    () => store.articleParams,
    (val, oldVal) => handler(val, oldVal)
  );

  function handler(val: any, oldVal: any) {
    state.params.tags = val.tags;
    state.params.catalog = val.catalog;
    state.articlesList = [];
    state.params.page = 1;
    handleSearch();
  }
  const articleList = ref([1, 2, 3]);
  const handleSearch = async (): Promise<void> => {
    state.isLoading = true;
    try {
      const data: ArticleArray = await getArticleList(state.params);
      state.isLoading = false;
      state.articlesList = [...state.articlesList, ...data.results];
      state.total = data.count;
      state.params.page++;
      await nextTick(() => {
        lazyload();
      });
      if (data.results.length === 0 || state.total === state.articlesList.length) {
        state.isLoadEnd = true;
        document.removeEventListener('scroll', () => {});
        window.onscroll = null;
      }
    } catch (e) {
      console.error(e);
      state.isLoading = false;
    }
  };
</script>
<template>
  <div class="full box-border pl-8 flex-col">
    <div class="flex items-center">
      <h1>hh</h1>
      <!-- <div cp ml> <a>文章</a> </div> -->
      <div cp ml> <a>分类</a> </div>
      <div cp ml> <a>关于</a> </div></div
    >
    <div>
      <h2>文章列表</h2>
      <div class="flex-col">
        <div v-for="(article, index) in articleList" :key="index">
          <div class="flex-col items-center mb-6">
            <h3 class="cp mb-2" style="width: fit-content">article title</h3>
            <div flex class="items-center">
              <div>article time</div>
              <div cp ml>article categroy</div>
              <!-- <div ml>{{ article }}>></div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  a {
    text-decoration: none;
  }
</style>
