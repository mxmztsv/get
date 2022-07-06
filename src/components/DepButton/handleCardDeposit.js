import { getItem } from "../../utils/localStorage";
import { sendReq } from "../../utils/sendReq";
import { toastC } from "../../utils/toastC";

export async function handleCardDeposit(amount) {
  if (!getItem("uBalMainId")) {
    toastC("Internal error. Please refresh the page", 1);
    return;
  }

  // part 1
  let res = await sendReq("post", "wallet/incomeForm", {
    amount: amount,
    walletId: getItem("uBalMainId"),
  });

  if (res && res.data && res.data.data.invoiceData) {
  } else {
    toastC("Internal error. Please try again later", 1);
  }

  // part 2
  let invoiceData = res.data.data.invoiceData;
  res = await sendReq("post", "wallet/incomePayment", {
    invoiceData: invoiceData,
    current_method: "floxypay",
  });

  if (res && res.data && res.data.data && res.data.data.payment_redirect) {
    let url = res.data.data.payment_redirect;

    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.click();
    document.body.removeChild(a);

    toastC(
      "Successfully submitted card deposit request. You will be redirected to the payment page",
      0
    );
  } else {
    toastC("Internal error. Please try again later", 1);
  }
}
