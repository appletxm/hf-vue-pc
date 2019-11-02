export default {
  methods: {
    $checkForm(formName) {
      let checkResult = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          checkResult = true;
        } else {
          checkResult = false;
        }
      });

      return checkResult;
    },
  },
};
