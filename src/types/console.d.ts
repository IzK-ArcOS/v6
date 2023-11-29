interface LogItem {
  timestamp?: number;
  level: LogLevel;
  msg: string;
  source: string;
}

enum LogLevel {
  info,
  warn,
  error,
  critical,
}
