import * as log4js from "log4js";
log4js.configure({
  appenders: {
    app: {
      type: "file",
      filename: "logs/app.log",
      maxLogSize: 10485760,
      backups: 3,
      layout: {
        type: "pattern",
        pattern:
          "%[%d{yyyy-MM-dd hh:mm:ss} [%p][%l:%o] [user:%X{user}] %C%] %m",
      },
    },
    console: {
      type: "console",
      layout: {
        type: "pattern",
        // %rtoLocaleTimeString 格式的时间
        // %p日志级别
        // %c日志类别
        // %h主机名
        // %m记录数据
        // %m{l}其中 l 是整数，log data.slice(l)
        // %m{l,u}其中 l 和 u 是整数，log data.slice(l, u)
        // %d日期，格式化 - 默认为ISO8601，格式选项为：ISO8601、ISO8601_WITH_TZ_OFFSET、ABSOLUTETIME、DATETIME或与日期格式库兼容的任何字符串。例如%d{DATETIME}，%d{yyyy/MM/dd-hh.mm.ss}
        // %%%% - 当你想在输出中使用文字时
        // %n新队
        // %z进程 ID（来自process.pid）
        // %f文件名的完整路径（需要enableCallStack: true类别，请参阅配置对象）
        // %f{depth}路径的深度让您可以选择仅包含文件名 ( %f{1}) 或选定数量的目录
        // %l行号（需要enableCallStack: true类别，请参阅配置对象）
        // %o列位置（需要enableCallStack: true类别，请参阅配置对象）
        // %s调用堆栈（需要enableCallStack: true类别，请参阅配置对象）
        // %C类名（需要enableCallStack: true类别，请参阅配置对象和#1316）
        // %M方法或函数名称（需要enableCallStack: true类别，请参阅配置对象和#1316）
        // %A方法或函数别名（需要enableCallStack: true类别，请参阅配置对象和#1316）
        // %F完全限定的调用者名称（需要enableCallStack: true类别，请参阅配置对象和#1316）
        // %x{<tokenname>}将动态标记添加到您的日志中。令牌在 tokens 参数中指定。
        // %X{<tokenname>}从记录器上下文添加值。令牌是上下文值的关键。
        // %[启动一个彩色块（颜色将从日志级别获取，类似于colouredLayout）
        // %]结束一个彩色块
        pattern: "%[%d{hh:mm:ss} [%p][%l:%o] [user:%X{user}] %C%] %m",
      },
    },
  },
  categories: {
    default: {
      appenders: ["app", "console"],
      level: "info",
      enableCallStack: true,
    },
  },
});

export const logger = log4js.getLogger();
