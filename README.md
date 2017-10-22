# Asummer
一个基于react-native的天气APP

**开发日记**

10.18 解决setstate不改变视图的问题，引入react-native-storage管理地理信息，根据地理位置获得天气信息

10.19 使用reset管理理由，使用FlatList代替ListView

10.21 增加定位功能，根据高德逆地理编码获得城市查询，增加未来几天天气页面

10.22 修复第一次打开因为this.props.navigation.state.params.dataFromUrl.data.forecast为空带来的红屏报错，顺便测试修改