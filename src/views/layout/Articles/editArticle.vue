<template>
<div class="AddArticle">
    <el-card>
      <template v-slot:header>
       <Hm-breadcrumb>编辑文章</Hm-breadcrumb>
      </template>
      <el-form :model="form" label-width="80px" :rules="rules" ref="form">
          <el-form-item label="标题" prop="title">
            <el-input placeholder="请输入标题" v-model="form.title"> </el-input>
          </el-form-item>
           <el-form-item label="内容" prop="content">
         <quill-editor
            v-model="form.content"
            placeholder="请输入文章的内容"
            :options="editorOption"
            @change="change"
            @blur="change"
          ></quill-editor>
          </el-form-item>
            <el-form-item label="封面">
                <el-radio-group v-model="form.cover.type" @change="changeType">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
          </el-form-item>
          <el-form-item v-if="form.cover.type > 0" >
          <hm-cover v-for="(item,index) in form.cover.type" :key="item"  v-model="form.cover.images[index]">
          </hm-cover>
          </el-form-item>

          <el-form-item label="频道" prop="channel_id" >
             <hm-channels v-model="form.channel_id"></hm-channels>
          </el-form-item>
          <el-form-item>
             <el-button type="primary" @click="edit">修改</el-button>
          </el-form-item>
      </el-form>
    </el-card>
</div>
</template>
<script>
import { editArticle, getArticleInfo } from '@/Api/article'

export default {
  name: 'AddArticle',
  async created () {
    // 获取id，---发送请求获取文章信息
    const res = await getArticleInfo(this.$route.params.id)
    this.form = res.data.data
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      rules: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: ['blur', 'change'] },
          { min: 5, max: 20, message: '文章标题为5-20个字符', trigger: ['blur', 'change'] }
        ],
        content: [
          { required: true, message: '文章内容不能为空', trigger: ['blur', 'change'] },
          {
            validator: (rule, value, callback) => {
              if (value.replace(/<[^>]+>/g, '').length < 20) {
                callback(new Error('文章内容不能少于20个字符'))
              } else {
                callback()
              }
            },
            trigger: ['blur', 'change']
          }
        ],
        channel_id: [
          { required: true, message: '请选择频道！', trigger: ['blur', 'change'] }
        ]

      },
      editorOption: {
        placeholder: '请输入文章内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            ['clean']
          ]
        }
      }
    }
  },

  methods: {

    change () {
      this.$refs.form.validateField('content')
    },
    changeType () {
      this.form.cover.images = []
    },
    async edit () {
      await editArticle(this.form)
      this.$router.push('/articles')
    }

  }
}
</script>
<style scoped lang="less">
.hm-cover {
  float: left;
  margin-right: 20px;
}
.AddArticle {
  ::v-deep {
    .ql-editor {
      height: 300px;
    }
    .ql-editor.ql-blank::before {
      color: rgba(0,0,0,0.3);
      font-style: normal;
    }
    .ql-snow .ql-color-picker .ql-picker-label svg,
    .ql-snow .ql-icon-picker .ql-picker-label svg {
      float: right;
    }
  }
}
</style>
