import chalk from "chalk";
import ora, { Ora } from "ora";

type HandlerParamer = Array<string | Record<string, any>>

/**
 * node Logger pkg
 */
export class Logger {
  private currentInstance: Ora | null = ora();
  constructor(
    /**
     * Plugin name
     */
    private name = ""
  ) {}

  /**
   * Create a loading spinner with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  create(text: string): Ora {
    this.currentInstance = ora({
      prefixText: chalk.blue(`${this.name}: `) || "",
      text,
    });

    return this.currentInstance;
  }

  /**
   * Update current loading spinner text
   *
   * @param text new hint text
   */
  update(text: string): void {
    if (this.currentInstance) this.currentInstance.text = text;
    else this.create(text);
  }

  /**
   * Trigger current instance to loading state or create a new loading spinner with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  load(text = ""): Ora {
    return (
      !text.trim() && this.currentInstance ? this.currentInstance : this.create(text)
    ).start();
  }

  createLogTxt(params: HandlerParamer) {
    let string = ''
    params.forEach(item => {
      if (typeof item === 'object') {
        string += JSON.stringify(item, null, 2) + '\n'
      } else {
        string += item.toString() + '\n'
      }
    })
    return string
  }

  /**
   * Trigger current instance to info state or create a new info icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  info(...texts: HandlerParamer): Ora {
    const string = this.createLogTxt(texts)
    return (
      !string.trim() && this.currentInstance ? this.currentInstance : this.create(string)
    ).info();
  }

  /**
   * Trigger current instance to success state or create a new success icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  success(...texts: HandlerParamer): Ora {
    const string = this.createLogTxt(texts)
    return (
      !string.trim() && this.currentInstance ? this.currentInstance : this.create(string)
    ).succeed();
  }

  /**
   * Trigger current instance to warn state or create a new warn icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  warn(...texts: HandlerParamer): Ora {
    const string = this.createLogTxt(texts)
    return (
      !string.trim() && this.currentInstance ? this.currentInstance : this.create(string)
    ).warn();
  }

  /**
   * Trigger current instance to warn state or create a new warn icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  error(...texts: HandlerParamer): Ora {
    const string = this.createLogTxt(texts)
    return (
      !string.trim() && this.currentInstance ? this.currentInstance : this.create(string)
    ).fail();
  }
}
