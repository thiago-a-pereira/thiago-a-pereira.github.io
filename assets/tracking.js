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

  function applyClickIdToOutboundLinks() {
    const params = getParams();
    const clickId = params.gclid || params.ttclid || params.wbraid || params.gbraid || params.msclkid || "";

    document.querySelectorAll("a[data-outbound-link='true']").forEach(function (link) {
      try {
        const url = new URL(link.href);
        if (params.utm_source) url.searchParams.set("traffic_source", params.utm_source);
        if (params.utm_medium) url.searchParams.set("traffic_type", params.utm_medium);
        if (params.utm_campaign) url.searchParams.set("campaign", params.utm_campaign);
        if (params.utm_content) url.searchParams.set("creative", params.utm_content);
        if (params.utm_term) url.searchParams.set("ad", params.utm_term);
        if (clickId) {
          url.searchParams.set("extclid", clickId);
        }
        link.href = url.toString();
      } catch (error) {
        return;
      }
    });
  }

  applyClickIdToOutboundLinks();

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
