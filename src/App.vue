<template>
  <div id="app">
    <div class="topbar">
      <el-link href="https://github.com/md5-table/md5-table.github.io/wiki/How-md5-table-works" target="_blank">
        md5-table 原理
      </el-link>
    </div>
    <div class="banner">
      <img src="./assets/logo.png" class="logo" />
      Free MD5 Decryption
    </div>
    <div class="input-container">
      <el-input
        class="input"
        v-model="input"
        placeholder="请输入32位或16位MD5值"
        clearable
      ></el-input>
      <el-button type="primary" class="decrypt-button" @click="decryptMD5">MD5 解密</el-button>
    </div>
    <div v-if="showOutput" class="output-container">
      <span v-if="result" class="output">
        <i class="el-icon-success icon-success" />
        解密结果为：
        <span class="result">{{result}}
          <i
            class="el-icon-document-copy icon-copy"
            title="Click Copy"
            v-clipboard:copy="result"
            v-clipboard:success="onCopy"
          />
        </span>
      </span>
      <span v-if="decryptFailed" class="output">
        <i class="el-icon-error icon-error" />
        解密失败！
      </span>
    </div>
    <div class="bottom">
      Copyright&copy;<el-link href="https://www.drunkdream.com/" target="_blank">drunkdream.com</el-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      result: '',
      decryptFailed: false,
      showOutput: false,
    }
  },
  methods: {
    async decryptMD5 () {
      this.decryptFailed = false
      this.result = ''
      if(this.input.length !== 16 && this.input.length !== 32) {
        this.$message({
          message: 'MD5值长度错误',
          type: 'warning'
        })
        this.input = ''
        return
      }
      if(!/^[\d|a-z|A-Z]+$/.test(this.input)) {
        this.$message({
          message: '不合法的MD5值',
          type: 'warning'
        })
        this.input = ''
        return
      }
      this.showOutput = true
      try{
        const result = await this.$axios.get(`/api/rmd5/${this.input}/`)
        this.result = result.data.value
      }catch(e){
        this.$message({
          message: `解密MD5失败：${e}`,
          type: 'warning'
        })
        this.decryptFailed = true
      }
    },
    onCopy() {
      this.$message({
          message: `拷贝剪切板成功！`,
          type: 'success'
        })
    }
  }
}
</script>

<style>
#app {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
}

.topbar {
  text-align: right;
  margin-right: 10px;
}

.banner {
  color: #576767;
  font-size: 50px;
  margin: 100px auto;
  font-weight: 450;
  text-align: center;
}

.logo {
  height: 64px;
  position: relative;
  top: 12px;
  margin-right: 10px;
}

.input-container {
  max-width: 600px;
  width: 96vw;
  margin: 100px auto 0 auto;
  text-align: center;
}

.input {
  width: 66%;
  display: inline-block;
}

.decrypt-button {
  margin-left: 15px;
  display: inline-block;
  width: 100px;
}

.output-container {
  border-radius: 4px;
  width: 500px;
  min-height: 100px;
  margin: 20px auto;
  background-color: #f4f4f4;
  padding-top: 10px;
  padding-left: 20px;
  color: #a0a0a0;
}

.icon-success {
  color: #67C23A;
  margin-right: 5px;
}

.icon-error {
  color: #F56C6C;
  margin-right: 5px;
}

.output {
  text-align: left;
}

.output > .result {
  border-radius: 2px;
  padding-left: 10px;
  padding-right: 5px;
  background: #409EFF;
  color: #f4f4f4;
}

.icon-copy {
  cursor: pointer;
  color: #ffffff;
  margin-left: 10px;
}

.bottom {
  position: absolute;
  top: calc(100vh - 60px);
  left: calc(50% - 100px);
  color: #919191;
}

.bottom a {
  margin: -4px auto 0 auto;
  font-size: 16px;
  font-weight: 400;
  color: #919191 !important;
}

@media screen and (max-width: 600px) {
  .banner {
    margin-top: 20px;
    margin-bottom: 0px;
  }

  .logo {
    display: none;
  }

  .input-container {
    margin-top: 40px;
  }

  .input {
    width: 100%;
  }

  .decrypt-button {
    display: block;
    margin: 40px auto;
    width: 200px;
  }
}

@media screen and (max-height: 500px) {
  .bottom {
    display: none;
  }
}

</style>
