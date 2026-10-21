// Set in the console to reveal /pricing/test and take $0 tester trials:
//   localStorage.setItem("fluxtrade:webhook-test", "1")
// This only changes the UI; the API allowlists who can actually use it.
export const WEBHOOK_TEST_FLAG = "fluxtrade:webhook-test";

export function readWebhookTestFlag(): boolean {
  try {
    return localStorage.getItem(WEBHOOK_TEST_FLAG) === "1";
  } catch {
    return false;
  }
}
