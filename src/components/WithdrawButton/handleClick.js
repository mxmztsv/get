export async function handleClickWith() {
  setIsLoading(true);

  if (isFPage) {
    // request code
    let res = await requestCode();
    if (res) {
      setIsFPage(false);
    }
    setIsLoading(false);
    setIsNeedUpdate(true);
  } else {
    // submit withdraw
    // @ts-ignore
    let code = document.getElementById("code-input").value;
    let res = await handleWithdraw(isGet, tokensForWith, code, isMain);
    if (res) {
      setIsFPage(true);
      setIsNeedUpdate(true);
      navigate("/profile");
    }
    setIsFPage(true);
    setIsNeedUpdate(true);
    setIsLoading(false);
  }
}
