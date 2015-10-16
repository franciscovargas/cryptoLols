

/home/francisco/cryptoLols/web_files/pweb.js:
  762                      c;
  763                  b.find(".txt").text(__("Preparing", "Preparing") + "...");
  764:                 c = pCloudCryptoDownload.download(a, {
  765                      onBegin: function() {
  766                          b.find(".txt").text(__("download_and_decrypt", "Download and Decrypt"))
  ...
  785                  });
  786                  b.find(".butt-area").append($('<div class="button linebut centerbut modernbut darkbut"></div>').text(__("cancel_download", "Cancel Download")).on("click", function() {
  787:                     pCloudCryptoDownload.abort(c);
  788                      HFN.message(__("download_stopped",
  789                          "Download Stopped."));
  ...
  802          }
  803      },
  804:     pCloudCryptoDownload = {
  805          defaultOpts: {
  806              onBegin: function() {},

18 matches across 4 files
