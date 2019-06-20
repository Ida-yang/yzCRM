<template>
  <div>
    <script ref="editorID" type="text/plain"></script>
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
        editor: null,
        id: 'editor' + new Date().getTime()
      }
    },
    props: {
      defaultMsg: {
        type: String,
        default:null,
      },
      config: {
        type: Object,
        default:null,
      }
    },
    watch:{
      'defaultMsg':function(val){
        this.editor.setContent(val)
      }
    },
    mounted() {
      // const _this = this;
      // this.editor = UE.getEditor('editor', this.config); // 初始化UE
      // this.editor.addListener("ready", function () {
      //   _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      // });
      this.$nextTick(function f1() {
        // 保证 this.$el 已经插入文档
        this.$refs.editorID.id = this.id //创建动态id
        this.editor = UE.getEditor(this.id, this.config)
        this.editor.ready(function f2() {
          this.editor.setContent(this.defaultMsg)
          this.editor.addListener("contentChange", function () {
            const wordCount = this.editor.getContentLength(true)
            const content = this.editor.getContent()
            const plainTxt = this.editor.getPlainTxt()
            const htmlCont = this.editor.getAllHtml()
            // 编辑器内容有变动,通知父组件
            this.$emit('input', { wordCount: wordCount, content: content, plainTxt: plainTxt ,htmlCont:htmlCont });
          }.bind(this))
          // editor初始化后操作
          this.$emit('ready', this.editor)
        }.bind(this))
    })
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      resetContent(){
        this.editor.setContent('')
      },
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>