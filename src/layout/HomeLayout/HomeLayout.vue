<script setup>
    import HeaderView from '@/components/Header/HeaderView.vue';
    import FooterView from '@/components/Footer/FooterView.vue';
</script>

<template>
    <main class="container-fluid container-xl" style="background-color: rgba(15, 15, 15, .9);">
        <HeaderView/>
        <RouterView/>
        <FooterView/>
    </main>
</template>