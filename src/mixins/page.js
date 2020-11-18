export default {
  data () {
    return {
      total: 0,
      page: 1,
      per_page: 10
    }
  },
  created () {
    this.getList()
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      this.getList()
    }
  }
}
