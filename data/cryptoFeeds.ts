export type CryptoFeedConfig = {
  pair: string;
  chainlinkDeviationThreshold: string;
  chainlinkHeartbeat: string;
  chainlinkAddress: string | null;
  pythFeedId: string | null;
};

export const CRYPTO_FEEDS: CryptoFeedConfig[] = [
  {
    pair: "AAVE/USD",
    chainlinkDeviationThreshold: "0.5%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x298619601ebCd58d0b526963Deb2365B485Edc74",
    pythFeedId: "2b9ab1e972a281585084148ba1389800799bd4be63b957507db1349314e47445"
  },
  {
    pair: "ADA/USD",
    chainlinkDeviationThreshold: "1%",
    chainlinkHeartbeat: "3600s",
    chainlinkAddress: "0x5e66a1775BbC249b5D51C13d29245522582E671C",
    pythFeedId: "2a01deaec9e51a579277b34b122399984d0bbf57e2458a7e42fecd2829867a0d"
  },
  {
    pair: "BCH/USD",
    chainlinkDeviationThreshold: "0.5%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x887f177CBED2cf555a64e7bF125E1825EB69dB82",
    pythFeedId: "3dd2b63686a450ec7290df3a1e0b583c0481f651351edfa7636f39aed55cf8a3"
  },
  {
    pair: "BNB/USD",
    chainlinkDeviationThreshold: "0.3%",
    chainlinkHeartbeat: "3600s",
    chainlinkAddress: "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526",
    pythFeedId: "2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f"
  },
  {
    pair: "BTC/ETH",
    chainlinkDeviationThreshold: "0.3%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x1a602D4928faF0A153A520f58B332f9CAFF320f7",
    pythFeedId: null
  },
  {
    pair: "BTC/USD",
    chainlinkDeviationThreshold: "0.3%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x5741306c21795FdCBb9b265Ea0255F499DFe515C",
    pythFeedId: "c9d8b075a5c69303365ae23633d4e085199bf5c520a3b90fed1322a0342ffc33"
  },
  {
    pair: "BUSD/ETH",
    chainlinkDeviationThreshold: "0.3%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x5ea7D6A33D3655F661C298ac8086708148883c34",
    pythFeedId: null
  },
  {
    pair: "BUSD/USD",
    chainlinkDeviationThreshold: "0.3%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa",
    pythFeedId: null
  },
  {
    pair: "CAKE/USD",
    chainlinkDeviationThreshold: "1%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x81faeDDfeBc2F8Ac524327d70Cf913001732224C",
    pythFeedId: "2356af9529a1064d41e32d617e2ce1dca5733afa901daba9e2b68dee5d53ecf9"
  },
  {
    pair: "DAI/BNB",
    chainlinkDeviationThreshold: "0.3%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x0630521aC362bc7A19a4eE44b57cE72Ea34AD01c",
    pythFeedId: null
  },
  {
    pair: "DAI/USD",
    chainlinkDeviationThreshold: "0.5%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0xE4eE17114774713d2De0eC0f035d4F7665fc025D",
    pythFeedId: "710659c5a68e2416ce4264ca8d50d34acc20041d91289110eea152c52ff3dc39"
  },
  {
    pair: "DODO/USD",
    chainlinkDeviationThreshold: "1%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x2939E0089e61C5c9493C2013139885444c73a398",
    pythFeedId: "688aa41b26a19db08855aaf87723a0eda91b8a830b782c3215bca3b208fad81a"
  },
  {
    pair: "DOGE/USD",
    chainlinkDeviationThreshold: "0.5%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x963D5e7f285Cc84ed566C486c3c1bC911291be38",
    pythFeedId: "7eab5e260e42d81013207e623be60c66c9c55bfe0ace4797ad00d1c5a1335eae"
  },
  {
    pair: "DOT/USD",
    chainlinkDeviationThreshold: "0.5%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0xEA8731FD0685DB8AeAde9EcAE90C4fdf1d8164ed",
    pythFeedId: "ca3eed9b267293f6595901c734c7525ce8ef49adafe8284606ceb307afa2ca5b"
  },
  {
    pair: "ETH/USD",
    chainlinkDeviationThreshold: "0.3%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7",
    pythFeedId: "cd4eb98d487478925bb032580ab13e7ccfcb2e814500b526f00bd9fa651cc6b6"
  },
  {
    pair: "FIL/USD",
    chainlinkDeviationThreshold: "0.5%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: null,
    pythFeedId: "150ac9b959aee0051e4091f0ef5216d941f590e1c5e7f91cf7635b5c11628c0e"
  },
  {
    pair: "GMT/USD",
    chainlinkDeviationThreshold: "0.5%",
    chainlinkHeartbeat: "900s",
    chainlinkAddress: "0x0EAeCDf64C9e8dC709d3B453f921D97c02B4515F",
    pythFeedId: "baa284eaf23edf975b371ba2818772f93dbae72836bbdea28b07d40f3cf8b485"
  },
  {
    pair: "INJ/USD",
    chainlinkDeviationThreshold: "1%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x58b299Fa027E1d9514dBbEeBA7944FD744553d61",
    pythFeedId: "7a5bc1d2b56ad029048cd63964b3ad2776eadf812edc1a43a31406cb54bff592"
  },
  {
    pair: "LINK/BNB",
    chainlinkDeviationThreshold: "0.5%",
    chainlinkHeartbeat: "3600s",
    chainlinkAddress: "0x351Ff08FF5077d6E8704A4763836Fe187f074380",
    pythFeedId: null
  },
  {
    pair: "LINK/USD",
    chainlinkDeviationThreshold: "0.3%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x1B329402Cb1825C6F30A0d92aB9E2862BE47333f",
    pythFeedId: "8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221"
  },
  {
    pair: "LTC/USD",
    chainlinkDeviationThreshold: "1%",
    chainlinkHeartbeat: "3600s",
    chainlinkAddress: "0x9Dcf949BCA2F4A8a62350E0065d18902eE87Dca3",
    pythFeedId: "6e3f3fa8253588df9326580180233eb791e03b443a3ba7a1d892e73874e19a54"
  },
  {
    pair: "MATIC/USD",
    chainlinkDeviationThreshold: "1%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x957Eb0316f02ba4a9De3D308742eefd44a3c1719",
    pythFeedId: null
  },
  {
    pair: "MBOX/USD",
    chainlinkDeviationThreshold: "0.5%",
    chainlinkHeartbeat: "900s",
    chainlinkAddress: "0x920667ED2615bc053A4b156aCD48919D83F997cF",
    pythFeedId: null
  },
  {
    pair: "REEF/USD",
    chainlinkDeviationThreshold: "1%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: null,
    pythFeedId: null
  },
  {
    pair: "SXP/USD",
    chainlinkDeviationThreshold: "0.3%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x678AC35ACbcE272651874E782DB5343F9B8a7D66",
    pythFeedId: "13b82e2a3f97f39504638b45aeab690ab47fd975f9a2e689cac3c77089f26f4d"
  },
  {
    pair: "TRX/USD",
    chainlinkDeviationThreshold: "0.5%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x135deD16bFFEB51E01afab45362D3C4be31AA2B0",
    pythFeedId: "67aed5a24fdad045475e7195c98a98aea119c763f272d4523f5bac93a4f33c2b"
  },
  {
    pair: "USDC/USD",
    chainlinkDeviationThreshold: "1%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x90c069C4538adAc136E051052E14c1cD799C41B7",
    pythFeedId: "eaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a"
  },
  {
    pair: "USDT/USD",
    chainlinkDeviationThreshold: "0.5%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0xEca2605f0BCF2BA5966372C99837b1F182d3D620",
    pythFeedId: "2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b"
  },
  {
    pair: "XAU/USD",
    chainlinkDeviationThreshold: "1%",
    chainlinkHeartbeat: "1800s",
    chainlinkAddress: "0x4E08A779a85d28Cc96515379903A6029487CEbA0",
    pythFeedId: null
  },
  {
    pair: "XRP/USD",
    chainlinkDeviationThreshold: "1%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0x4046332373C24Aed1dC8bAd489A04E187833B28d",
    pythFeedId: "95fd9e16d4cfc5d1370f32bb0bf2346860ad9c92fec83acf4ca263baf16c961d"
  },
  {
    pair: "XVS/USD",
    chainlinkDeviationThreshold: "0.3%",
    chainlinkHeartbeat: "86400s",
    chainlinkAddress: "0xCfA786C17d6739CBC702693F23cA4417B5945491",
    pythFeedId: null
  }
];
