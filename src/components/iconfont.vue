<template>
    <i class="iconfont relative top-0.4" :class="type"></i>
</template>
<script>
    export default {
        name: 'iconfont',
        props: {
            type: {
                // 背景高度
                type: String,
                default: '',
            },
        }
    };
</script>
<style scoped lang="scss"></style>