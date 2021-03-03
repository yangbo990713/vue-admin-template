<template>
  <div class="classification-edit">
    <el-form ref="form" :model="params" :rules="rules" inline size="small">
      <el-form-item label="类别名称：" prop="type_name">
        <el-input v-model="params.type_name" clearable placeholder="请输入类别名称" />
      </el-form-item>
      <el-form-item>
        <el-button @click="addClassification">确定</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetFields">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'ClassificationEdit',
  data() {
    return {
      params: {
        type_name: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入类别名称'
          },
          {
            whitespace: true,
            message: '类别名称不能为空格'
          },
          {
            max: 10,
            message: '类别名称最多10位'
          }
        ]
      }
    }
  },
  methods: {
    addClassification() {
      this.$refs.form.validate(validate => {
        if (!validate) return
        Axios.get('http://tp51/index.php/api/CommodityType/addType', { params: {
          type_name: this.params.type_name
        }})
          .then(({ data }) => {
            this.tableData = data.data
          })
        this.$message.success('添加成功')
        this.resetFields()
      })
    },
    resetFields() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.classification-edit {
  background-color: #fff;
  margin: 15px;
  padding: 10px;
  max-width: 700px;
  ::v-deep .el-form--inline .el-form-item {
    //margin-bottom: 0;
  }
  .el-form--inline{
    margin-top: 18px;
  }
}
</style>
