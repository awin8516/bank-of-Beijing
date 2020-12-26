using System;
using System.Security.Cryptography;
using System.Text;

    public class RSAProvider {

        private static Logger logger = Logger.CreateLogger(typeof(RSAProvider));
        public static int KEYSIZE = 1024;
        /// <summary>
        /// 自动生成公私密钥
        /// </summary>
        /// <param name="Modulus">输出:加密公钥</param>
        /// <param name="Exponent">输入:公钥指数</param>
        /// <param name="PrivateKey">输出:私钥</param>
        public static void GenerateKey(out string Modulus, out string Exponent, out string PrivateKey) {
            RSACryptoServiceProvider rsaProvider = new RSACryptoServiceProvider(KEYSIZE);

            RSAParameters pubparam = rsaProvider.ExportParameters(false);
            byte[] mod = pubparam.Modulus;
            byte[] exp = pubparam.Exponent;

            byte[] prikey = rsaProvider.ExportCspBlob(true);

            Modulus = Convert.ToBase64String(mod);
            Exponent = Convert.ToBase64String(exp);
            PrivateKey = Convert.ToBase64String(prikey);
        }

        /// <summary>
        /// RSA加密 
        /// </summary>
        /// <param name="TextData">待加密字符</param>
        /// <param name="Modulus">加密公钥</param>
        /// <param name="Exponent">加密指数</param>
        /// <param name="CryptText">输出:已加密字符串</param>
        /// <returns>0:成功加密 -1:待加密字符串不为能空 -2:加密公钥不能为空 -3:待加密字符串超长  -4:其他错误</returns>   
        public static int EncryptText(string TextData, string Modulus, string Exponent, out string CryptText) {
            CryptText = "";
            if (string.IsNullOrEmpty(TextData)) return -1;
            if (string.IsNullOrEmpty(Modulus)) return -2;
            if (TextData.Length > KEYSIZE / 8 - 11) return -3;
            try {
                RSACryptoServiceProvider rsa = new RSACryptoServiceProvider(KEYSIZE);
                byte[] modBytes = Convert.FromBase64String(Modulus);
                byte[] expBytes = Convert.FromBase64String(Exponent);

                RSAParameters p = new RSAParameters();
                p.Modulus = modBytes;
                p.Exponent = expBytes;

                rsa.ImportParameters(p);
                byte[] plainText = Encoding.UTF8.GetBytes(TextData);
                byte[] cipherBytes = rsa.Encrypt(plainText, false);

                CryptText = Convert.ToBase64String(cipherBytes);

                return 0;
            } catch (Exception ex) {
                logger.Info("加密错误:" + ex.Message
                    + "\r\n\r\n TextData=" + TextData
                    + "\r\n\r\n Modulus=" + Modulus
                    + "\r\n\r\n Exponent=" + Exponent);
                return -4;
            }
        }

        /// <summary>
        /// RSA解密
        /// </summary>
        /// <param name="CryptText">待解密字符串</param>
        /// <param name="Key">解密私钥</param>
        /// <param name="TextData">输出:已解密的字符串</param>
        /// <returns>0:成功解密 -1:待解密字符串不为能空 -2:解密私钥不能为空 -4:其他错误</returns>
        public static int DecryptText(string CryptText, string PrivateKey, out string TextData) {
            TextData = "";

            if (string.IsNullOrEmpty(CryptText)) return -1;
            if (string.IsNullOrEmpty(PrivateKey)) return -2;

            try {
                RSACryptoServiceProvider rsa = new RSACryptoServiceProvider(KEYSIZE);

                byte[] prikey = Convert.FromBase64String(PrivateKey); ;
                rsa.ImportCspBlob(prikey);

                byte[] cipherBytes = Convert.FromBase64String(CryptText);
                byte[] plainText = rsa.Decrypt(cipherBytes, false);

                TextData = Encoding.UTF8.GetString(plainText);

                return 0;
            } catch (Exception ex) {
                logger.Info("解密错误:" + ex.Message
                    + "\r\n\r\n CryptText=" + CryptText
                    + "\r\n\r\n PrivateKey=" + PrivateKey);
                return -4;
            }
        }
    }
