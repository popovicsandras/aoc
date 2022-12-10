export async function process(dataStream: AsyncGenerator<string, void, unknown>) {
  for await (let line of dataStream) {
  }
}
