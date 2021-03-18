<template>
    <div class="content">
        <el-container>
            <el-header class="content-center bg-gray-400" >
                <iconfont type="iconhome" class="text-xl"></iconfont>Header
            </el-header>
            <el-main class="bg-light-gray-100 h-screen">
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>
<script>
import iconfont from '../components/iconfont';
export default {
    data() {
        return {};
    },
    components: {
        iconfont,
    },
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style scoped lang="less"></style>
