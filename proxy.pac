function FindProxyForURL(url, host) {
    host = host.toLowerCase();

    // ----- 1. LOCAL / LAN BYPASS -----
    if (
        isPlainHostName(host) ||
        shExpMatch(host, "localhost") ||
        shExpMatch(host, "127.*") ||
        shExpMatch(host, "10.*") ||
        shExpMatch(host, "192.168.*") ||
        shExpMatch(host, "172.16.*") || shExpMatch(host, "172.17.*") ||
        shExpMatch(host, "172.18.*") || shExpMatch(host, "172.19.*") ||
        shExpMatch(host, "172.20.*") || shExpMatch(host, "172.21.*") ||
        shExpMatch(host, "172.22.*") || shExpMatch(host, "172.23.*") ||
        shExpMatch(host, "172.24.*") || shExpMatch(host, "172.25.*") ||
        shExpMatch(host, "172.26.*") || shExpMatch(host, "172.27.*") ||
        shExpMatch(host, "172.28.*") || shExpMatch(host, "172.29.*") ||
        shExpMatch(host, "172.30.*") || shExpMatch(host, "172.31.*")
    ) return "DIRECT";

    // ----- 2. APP-BYPASS ZONE -----
    const bypass = [
        "apple.com", "icloud.com", "mzstatic.com", "cdn-apple.com",
        "binance", "coinbase", "revolut", "cash.app", "stripe", "paypal",
        "bank", "wallet",
        "instagram.com", "fbcdn.net", "whatsapp.net", "snapchat.com",
        "tiktokcdn.com", "tiktokv.com", "youtube.com", "ytimg.com",
        "akamai", "cloudfront.net", "fastly.net"
    ];

    for (let i = 0; i < bypass.length; i++)
        if (dnsDomainIs(host, bypass[i]) || shExpMatch(host, "*." + bypass[i]))
            return "DIRECT";

    // ----- 3. FORCE PROXY ZONE -----
    const force = [
        "netflix.com", "nflxvideo.net",
        "hulu.com",
        "max.com",
        "disneyplus.com",
        "ipinfo.io", "ipify.org"
    ];

    for (let i = 0; i < force.length; i++)
        if (dnsDomainIs(host, force[i]) || shExpMatch(host, "*." + force[i]))
            return "PROXY 144.125.164.158:8081";

    // ----- 4. DEFAULT FALLBACK CHAIN -----
    return "PROXY 144.125.164.158:8081; PROXY 144.125.164.158:8081; DIRECT";
}
