<template>
    <div class="language__switcher">
        <div class="language__switcher--each "
        :class="{ active: currentLocale === 'uz' }"
        @click="changeLanguage('uz')"
        >

            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="flag-icons-uz" viewBox="0 0 640 480">
            <path fill="#1eb53a" d="M0 320h640v160H0z"/>
            <path fill="#0099b5" d="M0 0h640v160H0z"/>
            <path fill="#ce1126" d="M0 153.6h640v172.8H0z"/>
            <path fill="#fff" d="M0 163.2h640v153.6H0z"/>
            <circle cx="134.4" cy="76.8" r="57.6" fill="#fff"/>
            <circle cx="153.6" cy="76.8" r="57.6" fill="#0099b5"/>
            <g fill="#fff" transform="translate(261.1 122.9)scale(1.92)">
                <g id="uz-e">
                <g id="uz-d">
                    <g id="uz-c">
                    <g id="uz-b">
                        <path id="uz-a" d="M0-6-1.9-.3 1 .7"/>
                        <use xlink:href="#uz-a" width="100%" height="100%" transform="scale(-1 1)"/>
                    </g>
                    <use xlink:href="#uz-b" width="100%" height="100%" transform="rotate(72)"/>
                    </g>
                    <use xlink:href="#uz-b" width="100%" height="100%" transform="rotate(-72)"/>
                    <use xlink:href="#uz-c" width="100%" height="100%" transform="rotate(144)"/>
                </g>
                <use xlink:href="#uz-d" width="100%" height="100%" y="-24"/>
                <use xlink:href="#uz-d" width="100%" height="100%" y="-48"/>
                </g>
                <use xlink:href="#uz-e" width="100%" height="100%" x="24"/>
                <use xlink:href="#uz-e" width="100%" height="100%" x="48"/>
                <use xlink:href="#uz-d" width="100%" height="100%" x="-48"/>
                <use xlink:href="#uz-d" width="100%" height="100%" x="-24"/>
                <use xlink:href="#uz-d" width="100%" height="100%" x="-24" y="-24"/>
            </g>
            </svg>
        </div>
        <div class="language__switcher--each" 
        :class="{ active: currentLocale === 'ru' }"
      @click="changeLanguage('ru')"
      >
            <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-ru" viewBox="0 0 640 480">
            <path fill="#fff" d="M0 0h640v160H0z"/>
            <path fill="#0039a6" d="M0 160h640v160H0z"/>
            <path fill="#d52b1e" d="M0 320h640v160H0z"/>
            </svg>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    currentLocale: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeLanguage(locale) {
        this.$emit('language-changed', locale);
    },
  },
};
</script>
<style>

  .language__switcher{
    position: fixed;
    top: 20px;
    right: 20px;
    width: fit-content;
    display: flex;
    justify-content: space-between;
    border: 1px solid rgb(238, 238, 238);
    border-radius: 10px;
    overflow: hidden;
   
    margin: 0 10px;
    align-items: center;
  }
  .language__switcher .language__switcher--each{
    padding: 0.15rem 12px;
    margin: 0.2rem 0.2rem;
  }
  .language__switcher .language__switcher--each.active, .language__switcher .language__switcher--each:hover{
    background-color: white;
    cursor: pointer;
    box-shadow: 0 0 5px silver;
    border-radius: 6px;
  }
  .language__switcher svg{
    width: 20px;
    height: 15px;
    border: 1px solid #c0c0c06b;
  }
</style>