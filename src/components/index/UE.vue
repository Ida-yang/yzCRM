<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  // import AppConfig from '@/config'
  import '../../../static/UE/ueditor.config.js'
  import '../../../static/UE/ueditor.all.js'
  import '../../../static/UE/lang/zh-cn/zh-cn.js'
  export default {
    name: 'UEditor',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>