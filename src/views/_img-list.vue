<template>
    <div class="img-list-wrap" :class="$options.name" style="display: flex">
        <div v-for="(item, index) in imgArr" :key="index">
            <slot :item="item" :index="index">
                <van-image width="100" height="100" :src="item" />
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    // 如果需要记录滚动条位置, name必须设置, 且每个路由组件的name必须保证唯一性
    name: 'img-list',
    props: {
        imgArr: {
            type: Array,
            default: () => []
        }
    },
    setup() {}
}
</script>
