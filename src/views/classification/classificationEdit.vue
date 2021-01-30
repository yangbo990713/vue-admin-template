<template>
  <div class="classification-edit">
    <el-form ref="form" :model="params" :rules="rules" inline size="small">
      <el-form-item label="类别名称：" prop="name">
        <el-input v-model="params.name" clearable placeholder="请输入类别名称" />
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
export default {
  name: 'ClassificationEdit',
  data() {
    return {
      params: {
        name: ''
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
        let tableData = localStorage.getItem('classificationList')
        if (tableData) {
          tableData = JSON.parse(tableData)
        } else {
          tableData = []
        }
        const id = tableData.length ? tableData[tableData.length - 1].id + 1 : 1
        tableData.push(Object.assign(this.params, { id }))
        localStorage.setItem('classificationList', JSON.stringify(tableData))
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

  ::v-deep .el-form--inline .el-form-item {
    //margin-bottom: 0;
  }
  .el-form--inline{
    margin-top: 18px;
  }
}
</style>
