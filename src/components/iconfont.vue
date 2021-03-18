<template>
    <!-- relative top-0.4 样式是解决图标与后方文字无法水平对齐问题的 -->
    <i class="iconfont relative top-0.4" :class="type"></i>
</template>
<script>
    export default {
        name: 'iconfont',
        props: {
            type: {
                type: String,
                default: '',
            },
        }
    };
</script>
<style scoped lang="scss"></style>