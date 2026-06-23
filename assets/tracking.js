(function () {
  function getParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search).entries());
  }

  function saveEvent(event) {
    const key = "affiliate_ai_ops_events";
    const events = JSON.parse(localStorage.getItem(key) || "[]");
    events.push(event);
    localStorage.setItem(key, JSON.stringify(events.slice(-200)));
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  }

  document.addEventListener("click", function (event) {
    const link = event.target.closest("a[data-outbound-link='true']");
    if (!link) return;
    saveEvent({
      event: "outbound_click",
      offerId: link.dataset.offerId || "",
      href: link.href,
      page: window.location.pathname,
      params: getParams(),
      timestamp: new Date().toISOString()
    });
  });
})();
