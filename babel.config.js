module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {'legacy': true}],
    ['module-resolver', {
      // 表示哪个目录开始设置绝对路径
      root: ['./src'],
      alias: {
        '@': './src'
      }
    }]
  ]
};
