<template>
  <el-form ref="form" :inline="inline" :model="params" :rules="rules" label-width="auto" size="small">
    <el-form-item label="订单编号：" prop="code">
      <el-input v-model="params.code" clearable placeholder="请输入订单编号" />
    </el-form-item>
    <el-form-item label="物品名称：" prop="goodsId">
      <el-select v-model="params.goodsId" placeholder="请选择物品" @change="selectGoods">
        <el-option v-for="item of goodsList" :key="item.id " :label="item.name" :value="item.id" />
      </el-select>
      <template v-if="params.goodsId">
        价格：{{ params.price }}
      </template>
    </el-form-item>
    <el-form-item label="日期：" prop="date">
      <el-date-picker v-model="params.date" placeholder="请输入日期" value-format="yyyy-MM-dd" />
    </el-form-item>
    <el-form-item label="数量：" prop="number">
      <el-input v-model.number="params.number" clearable placeholder="请输入数量" />
    </el-form-item>
    <el-form-item label="商家名称：" prop="merchantId">
      <el-select v-model="params.merchantId" placeholder="请选择商家" @change="selectMerchant">
        <el-option v-for="item of merchantList" :key="item.id " :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="订单级别：" prop="levelId">
      <el-select v-model="params.levelId" placeholder="请选择级别" @change="selectLevel">
        <el-option v-for="item of levelList" :key="item.id " :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="addOrder">确定</el-button>
      <el-button v-if="!inline" @click="resetFields">清空</el-button>
    </el-form-item>
    <el-form-item v-if="inline">
      <el-button @click="resetFields">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'OrderForm',
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
      goodsList: [],
      merchantList: [],
      levelList: [
        {
          name: '普通',
          id: 0
        },
        {
          name: '加急',
          id: 1
        }
      ],
      rules: {
        code: [
          {
            required: true,
            message: '请输入订单编号'
          },
          {
            pattern: /^[a-z0-9]+$/i,
            message: '订单编号只能由英文和数字组成'
          },
          {
            max: 10,
            message: '订单编号最多10位'
          }
        ],
        number: [
          {
            required: true,
            message: '请输入数量'
          },
          {
            type: 'number',
            message: '请输入合法数字'
          }
        ]
      }
    }
  },
  created() {
    this.getGoodsList()
    this.getMerchantList()
  },
  methods: {
    getGoodsList() {
      const tableData = localStorage.getItem('goodsList')
      if (tableData) {
        this.goodsList = JSON.parse(tableData)
      }
    },
    getMerchantList() {
      const tableData = localStorage.getItem('merchantList')
      if (tableData) {
        this.merchantList = JSON.parse(tableData)
      }
    },
    selectGoods(val) {
      const item = this.goodsList.find(item => item.id === val)
      this.params.goodsName = item.name
      this.params.price = item.price
      this.params.goodsCode = item.code
    },
    selectMerchant(val) {
      const item = this.merchantList.find(item => item.id === val)
      this.params.merchantName = item.name
      this.params.merchantCode = item.code
    },
    selectLevel(val) {
      const item = this.levelList.find(item => item.id === val)
      this.params.levelName = item.name
    },
    addOrder() {
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
