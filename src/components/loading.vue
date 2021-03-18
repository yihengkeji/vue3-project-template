<template>
    <div class="loading-cover fixed inset-0 z-40 w-screen h-screen bg-gray-400 bg-opacity-80 transition-all">
        <div class="loader z-50">
            <div class="outer"></div>
            <div class="middle"></div>
            <div class="inner"></div>
        </div>
        <div class="msg absolute w-screen content-center text-lg font-semibold">{{ msg }}</div>
    </div>
</template>
<script>
export default {
    name: 'loading',
    props: {
        msg: String
    },
};
</script>
<style scoped>
.loader {
    position: relative;
    top: 50%;
}

.outer,
.middle,
.inner {
    border: 3px solid transparent;
    border-top-color: #DEC8EE;
    border-right-color: #DEC8EE;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
}

.msg{
    color: #DEC8EE;
    top: calc(50% + 40px);
    text-align: center;
}

.outer {
    width: 3.5em;
    height: 3.5em;
    margin-left: -1.75em;
    margin-top: -1.75em;
    animation: spin-24a16d5c 2s linear infinite;
}

.middle {
    width: 2.1em;
    height: 2.1em;
    margin-left: -1.05em;
    margin-top: -1.05em;
    animation: spin-24a16d5c 1.75s linear reverse infinite;
}

.inner {
    width: 0.8em;
    height: 0.8em;
    margin-left: -0.4em;
    margin-top: -0.4em;
    animation: spin-24a16d5c 1.5s linear infinite;
}

@keyframes spin-24a16d5c {
    to {
        transform: rotate(360deg);
    }
}
</style>
