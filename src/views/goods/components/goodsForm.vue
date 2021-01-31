<template>
  <el-form ref="form" :inline="inline" :model="params" :rules="rules" label-width="auto" size="small">
    <el-form-item label="物品编号：" prop="code">
      <el-input v-model="params.code" clearable placeholder="请输入物品编号" />
    </el-form-item>
    <el-form-item label="物品名称：" prop="name">
      <el-input v-model="params.name" clearable placeholder="请输入物品名称" />
    </el-form-item>
    <el-form-item label="类别：" prop="classificationId">
      <el-select v-model="params.classificationId" placeholder="请选择物品类别" @change="selectClassification">
        <el-option v-for="item of classificationList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="价格：" prop="price">
      <el-input v-model.number="params.price" clearable placeholder="请输入价格" />
    </el-form-item>
    <el-form-item label="库存：" prop="number">
      <el-input v-model="params.number" clearable placeholder="请输入库存" />
    </el-form-item>
    <el-form-item>
      <el-button @click="addClassification">确定</el-button>
      <el-button v-if="!inline" @click="resetFields">清空</el-button>
    </el-form-item>
    <el-form-item v-if="inline">
      <el-button @click="resetFields">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'GoodsForm',
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
      classificationList: [],
      rules: {
        code: [
          {
            required: true,
            message: '请输入物品编号'
          },
          {
            pattern: /^[a-z0-9]+$/i,
            message: '物品编号只能由英文和数字组成'
          },
          {
            max: 10,
            message: '物品编号最多10位'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入物品名称'
          },
          {
            whitespace: true,
            message: '物品名称不能为空格'
          },
          {
            max: 10,
            message: '物品名称最多20位'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入物品价格'
          },
          {
            type: 'number',
            message: '请输入合法数字'
          }
        ],
        classificationId: [
          {
            required: true,
            message: '请选择物品类别'
          }
        ]
      }
    }
  },
  created() {
    this.getClassificationList()
  },
  methods: {
    getClassificationList() {
      const tableData = localStorage.getItem('classificationList')
      if (tableData) {
        this.classificationList = JSON.parse(tableData)
      }
    },
    selectClassification(val) {
      const item = this.classificationList.find(item => item.id === val)
      this.params.classification = item.name
    },
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
