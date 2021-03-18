<template>
    <div class="content" :class="{ blur: showLoading }">
        <BackgroundDesign height="screen"></BackgroundDesign>
        <div class="grid grid-cols-12 grid-rows-4 absolute inset-0 w-screen h-screen z-10">
            <div class="flex col-start-3 col-end-11 row-start-2 row-end-4 bg-white rounded-lg shadow-lg">
                <div class="flex flex-1 items-center">
                    <div class="relative">
                        <img class="absolute animate__animated animate__pulse animate__infinite" src="../assets/images/login_photo_02.png" alt="" style="top: 24px; left: 95px; width: 112px; height: 113px;" />
                        <img class="mx-auto" src="../assets/images/login_photo_01.png" alt="" />
                    </div>
                </div>
                <div class="flex-1 grid grid-cols-8 grid-rows-6">
                    <div class="col-start-2 col-end-8 row-start-2 row-end-6">
                        <div class="text-3xl text-gray-900 font-medium">欢迎登录 <span class="ml-2 text-xl text-gray-700 italic font-normal">XXX平台</span></div>
                        <el-form label-position="top" ref="form" :model="form" class="mt-10">
                            <el-form-item label="手机号码">
                                <el-input v-model="form.phonenumber" placeholder="请输入手机号码"></el-input>
                            </el-form-item>

                            <el-form-item label="验证码">
                                <el-input v-model="form.code" placeholder="请输入验证码">
                                    <template #append>
                                        <el-button class="focus:outline-none">
                                            <i class="iconfont iconmobile_friendly"></i>
                                            <span class="ml-2 font-normal inline-block">发送验证码</span>
                                        </el-button>
                                    </template>
                                </el-input>
                            </el-form-item>

                            <el-button type="primary" plain class="focus:outline-none w-full mt-4 text-base" @click="loginAction">登录</el-button>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Loading :msg="loadingText" v-show="showLoading"></Loading>
</template>
<script>
import BackgroundDesign from '../components/backgroundDesign.vue';
import Loading from '../components/loading.vue';
import $api from '../api/api.js';
export default {
    data() {
        return {
            form: {
                phonenumber: '',
                code: '',
            },

            showLoading: false,
            loadingText: '',
        };
    },
    components: {
        BackgroundDesign,
        Loading,
    },
    created() {},
    mounted() {},
    methods: {
        loginAction() {
            this.showLoading = true;
            this.loadingText = '正在登录，请稍后...';
            $api.loginAPI
                .login({})
                .then((res) => {
                    res.status === 200 ? (this.showLoading = false) : '';
                    this.$router.push('/');
                })
                .catch((err) => {
                    console.log(err);
                    this.showLoading = false;
                    this.$message({
                        message: '登录请求失败！',
                        type: 'error'
                    });
                });
        },
    },
};
</script>
<style scoped lang="less">
html,
body {
    overflow: hidden;
}
</style>
