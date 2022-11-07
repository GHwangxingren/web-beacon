<template>
  <e-drawer-sp
    titleIconBg="#6359ca"
    :visible.sync="dialogVisible"
    :close-on-press-escape="false"
    :wrapperClosable="false"
    min-height="700px"
    class="billingCharg updatepassDrawer"
    title="修改密码"
    :class="type == 1 ? 'drawerHeader1' : ''"
    @open="open"
  >
    <el-form ref="form" :model="formObj" label-position="top" label-width="100px" size="small" :rules="rules">
      <el-form-item label="旧密码：" prop="oldPassword">
        <el-input type="password" placeholder="请输入旧密码" v-model="formObj.oldPassword" maxlength="12"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input type="password" placeholder="请输入新密码" v-model="formObj.newPassword" maxlength="12"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="rePassword">
        <el-input type="password" placeholder="请输入确认密码" v-model="formObj.rePassword" maxlength="12"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button class="btns" @click="dialogVisible = false" v-if="type == 2">取消</el-button>
      <el-button type="primary" class="btns" @click="submitBtn">提交</el-button>
    </template>
  </e-drawer-sp>
</template>
<script>
export default {
  data() {
    let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formObj.rePassword !== '') {
            this.$refs.form.validateField('rePassword');
          }
          callback();
        }
      },
      validateRePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formObj.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      dialogVisible: false,
      formObj: {
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      },
      rules: {
        oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPassword: [{ validator: validatePass, trigger: 'blur', required: true }],
        rePassword: [{ validator: validateRePass, trigger: 'blur', required: true }]
      }
    };
  },
  props: {
    type: {
      default: 2
    }
  },
  methods: {
    open() {
      this.formObj.oldPassword = '';
      this.formObj.newPassword = '';
      this.formObj.rePassword = '';
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    submitBtn() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let obj = {
            oldPassword: this.formObj.oldPassword,
            newPassword: this.formObj.newPassword
          };
          this.$HttpNomal.updatePass(obj).then((res) => {
            if (res.code == 0) {
              this.$message.success('密码修改成功'); // res.msg
              this.dialogVisible = false;
            } else {
              this.$message.error(res.msg || '密码修改失败');
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.updatepassDrawer {
}
.drawerHeader1 {
  /deep/ .el-drawer__close-btn {
    display: none;
  }
}
</style>
