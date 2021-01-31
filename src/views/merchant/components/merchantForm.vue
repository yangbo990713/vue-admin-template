<template>
  <el-form ref="form" :inline="inline" :model="params" :rules="rules" label-width="auto" size="small">
    <el-form-item label="商家编号：" prop="code">
      <el-input v-model="params.code" clearable placeholder="请输入商家编号" />
    </el-form-item>
    <el-form-item label="商家名称：" prop="name">
      <el-input v-model="params.name" clearable placeholder="请输入商家名称" />
    </el-form-item>
    <el-form-item label="联系人：" prop="person">
      <el-input v-model="params.person" clearable placeholder="请输入联系人" />
    </el-form-item>
    <el-form-item label="电话：" prop="tel">
      <el-input v-model="params.tel" clearable placeholder="请输入电话" />
    </el-form-item>
    <el-form-item label="地址：" prop="address">
      <el-input v-model="params.address" clearable placeholder="请输入地址" />
    </el-form-item>
    <el-form-item>
      <el-button @click="addClassification">确定</el-button>
    </el-form-item>
    <!--<el-form-item v-if="inline">
      <el-button @click="resetFields">清空</el-button>
    </el-form-item>-->
  </el-form>
</template>

<script>
export default {
  name: 'MerchantForm',
  props: {
    params: {
      type: Object,
      required: true
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        code: [
          {
            required: true,
            message: '请输入商家编号'
          },
          {
            pattern: /^[a-z0-9]+$/i,
            message: '商家编号只能由英文和数字组成'
          },
          {
            max: 10,
            message: '商家编号最多10位'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入商家名称'
          },
          {
            whitespace: true,
            message: '商家名称不能为空格'
          },
          {
            max: 10,
            message: '商家名称最多20位'
          }
        ],
        person: [
          {
            whitespace: true,
            message: '联系人不能为空格'
          }
        ],
        tel: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的手机号码'
          }
        ],
        address: [
          {
            whitespace: true,
            message: '地址不能为空格'
          }
        ]
      }
    }
  },
  methods: {
    addClassification() {
      this.$refs.form.validate(validate => {
        if (!validate) return
        this.$emit('confirm', this.params)
      })
    },
    resetFields() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item{
  &:last-child{
    margin-bottom: 0;
  }
}
</style>
