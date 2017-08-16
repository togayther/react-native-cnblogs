
## 由于博客园官方近期正在对其授权接口进行安全验证方面的重构，以防范openapi存在被暴力攻击的风险，所以暂时关闭了登录接口。目录本项目暂时无法登录（接口返回：{"error":"unauthorized_client"}）。请大家谅解。代码仅供参考。

## introduction 简介

This is based on the react-native implementation of the cnblogs.com's mobile client for both android and ios. if you have any comments or suggestions, welcome feedback.

基于 react-native 实现的博客园移动客户端，兼容android和ios。如果您有任何问题或者建议，欢迎留言反馈，作者会第一时间进行回复，谢谢！

## screenshot 截图

![login page ](http://123.56.135.166/cnblog/public/img/screenshot_new/login_360.png)

![home page ](http://123.56.135.166/cnblog/public/img/screenshot_new/home_360.png)

![user page ](http://123.56.135.166/cnblog/public/img/screenshot_new/user_360.png?v=1.1)

![detail page](http://123.56.135.166/cnblog/public/img/screenshot_new/post_360.png?v=1.1)

![drawer page](http://123.56.135.166/cnblog/public/img/screenshot_new/drawer_360.png)

## download 下载
### android
#### qrcode
![download qrcode](http://123.56.135.166/cnblog/public/img/qrcode/fir_cnblogs.png?v=1.0)

#### download link: 
http://fir.im/togayther


### ios
#### qrcode
![download qrcode](http://123.56.135.166/cnblog/public/img/qrcode/ios_cnblogs.png?v=1.1)

#### appstore link:
https://itunes.apple.com/cn/app/bo-ke-yuan-she-qu/id1176047767?l=zh&ls=1&mt=8

## how to run 本地运行
note: if you behind GFW, strongly recommend that you work with vpn.

提示：如果你处于全球最大的局域网，强烈建议你购买一个vpn。

* config your react-native environment: https://facebook.github.io/react-native/docs/getting-started.html
* git clone https://github.com/togayther/react-native-cnblogs.git
* npm install
* react-native link
* connect physical device or turn on the emulator
* react-native run-android/run-ios
* good luck and enjoy

注意：
因为本软件涉及到基于oauth的登录授权，故本地运行还需要向博客园申请 clientId、clientSecret、rsa加密公钥等授权信息。否则运行后无法登录进入首页。

应博客园官方团队要求，该软件开源时未公开已取得的授权信息。非常抱歉。

授权信息申请方式：

对于个人开发者，需要提供以下信息：
真实姓名、手机号码、常用邮箱、相关app介绍。
然后邮件发送至： contact@cnblogs.com

授权信息配置文件：source/config/index.js => authData

## License 授权协议
This project is available under the MIT license.

## donation 捐赠
该软件自发布以来，根据用户的反馈，已迭代了几个版本，用户数也越来越多，如果您觉得它对您有所帮助，可以通过支付宝给作者捐赠。

![donation code](http://123.56.135.166/resource/img/zhifu-qrcode.png)

特此感谢以下捐赠同仁（时间排序）：
* jingxin2015
* 杰哥
* kitty
* 静静的西河
