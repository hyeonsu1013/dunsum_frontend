<template>
    <footer class="cont_center">
        <div class="footer-content cont_center">
            <p>
                developed by <a :href="url_front" target="_blank">Javayaji_Front</a> / <a :href="url_back" target="_blank">Javayaji_Back</a> 2022
            </p>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",
    data(){
        return{
            url_front : 'https://github.com/hyeonsu1013/dunsum_frontend',
            url_back : 'https://github.com/hyeonsu1013/dunsum_backend',
        }
    }
}
</script>