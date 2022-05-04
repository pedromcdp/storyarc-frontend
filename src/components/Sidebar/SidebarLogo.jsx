import Link from 'next/link';

export default function SidebarLogo() {
  return (
    <div
      className="mb-1 w-36 h-12 cursor-pointer"
      aria-label="Storyarc"
      role="link"
    >
      <Link href="/" passHref={true}>
        <svg
          tabIndex={0}
          className="w-full h-full"
          viewBox="0 0 1364 297"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M454.13 114.712C453.904 95.3502 446.054 76.8577 432.283 63.2458C418.511 49.6338 399.928 42 380.565 42C361.202 42 342.619 49.6338 328.847 63.2458C315.076 76.8577 307.226 95.3502 307 114.712H352.68C352.538 107.136 355.412 99.8144 360.668 94.3571C365.925 88.8998 373.134 85.7542 380.71 85.6123C388.286 85.4704 395.608 88.3438 401.065 93.6005C406.522 98.8571 409.668 106.066 409.81 113.642C409.81 114.002 409.81 114.352 409.81 114.712H454.13Z"
            stroke="#37B780"
            strokeWidth="9"
            strokeMiterlimit="10"
          />
          <path
            d="M454.13 138.032C454.13 138.032 409.58 227.792 380.56 227.792C351.54 227.792 307 138.032 307 138.032H352C352 145.61 355.01 152.876 360.368 158.234C365.726 163.592 372.993 166.602 380.57 166.602C388.147 166.602 395.414 163.592 400.772 158.234C406.13 152.876 409.14 145.61 409.14 138.032H454.13Z"
            fill="#37B780"
          />
          <path
            d="M80.1228 229.432C70.0591 229.432 59.5115 227.593 48.4801 223.916C37.4487 220.239 28.2559 214.046 20.9016 205.337C19.3533 203.402 18.676 201.369 18.8695 199.241C19.2566 196.918 20.5145 194.983 22.6434 193.435C24.5787 192.08 26.6108 191.596 28.7397 191.983C31.0621 192.37 32.9007 193.435 34.2554 195.176C39.8679 201.757 46.6415 206.401 54.5764 209.111C62.7048 211.627 71.5106 212.885 80.9937 212.885C97.2505 212.885 108.766 209.982 115.539 204.176C122.313 198.37 125.7 191.596 125.7 183.855C125.7 176.307 122.023 170.114 114.668 165.276C107.508 160.244 96.3796 156.663 81.284 154.534C61.9307 151.825 47.6092 146.6 38.3196 138.858C29.03 131.117 24.3852 122.118 24.3852 111.86C24.3852 102.184 26.8044 94.0552 31.6427 87.4751C36.481 80.7014 43.0612 75.6696 51.3831 72.3795C59.8986 68.8959 69.5752 67.1541 80.4131 67.1541C93.5734 67.1541 104.702 69.5733 113.798 74.4116C122.894 79.0564 130.248 85.3462 135.86 93.2811C137.409 95.2164 137.892 97.3453 137.312 99.6677C136.925 101.797 135.473 103.538 132.957 104.893C131.022 105.861 128.99 106.151 126.861 105.764C124.732 105.377 122.894 104.216 121.345 102.28C116.507 96.0873 110.604 91.4425 103.637 88.346C96.8634 85.0559 88.9286 83.4109 79.8325 83.4109C67.6399 83.4109 58.1568 86.0236 51.3831 91.249C44.6094 96.4744 41.2226 102.764 41.2226 110.118C41.2226 115.15 42.5773 119.602 45.2868 123.472C48.1898 127.149 52.8346 130.343 59.2212 133.052C65.6078 135.568 74.1233 137.6 84.7676 139.149C99.2826 141.084 110.701 144.374 119.023 149.019C127.538 153.664 133.538 159.082 137.022 165.276C140.699 171.275 142.537 177.758 142.537 184.726C142.537 193.822 139.634 201.757 133.828 208.53C128.022 215.304 120.378 220.529 110.895 224.206C101.411 227.69 91.1542 229.432 80.1228 229.432ZM246.794 227.69C236.149 227.496 226.666 225.077 218.344 220.433C210.022 215.594 203.539 209.014 198.894 200.692C194.249 192.177 191.927 182.597 191.927 171.952V27.383C191.927 24.6735 192.701 22.5447 194.249 20.9964C195.991 19.2546 198.12 18.3837 200.636 18.3837C203.345 18.3837 205.474 19.2546 207.022 20.9964C208.764 22.5447 209.635 24.6735 209.635 27.383V171.952C209.635 183.177 213.119 192.37 220.086 199.531C227.053 206.498 236.052 209.982 247.084 209.982H253.47C256.18 209.982 258.309 210.853 259.857 212.594C261.599 214.143 262.47 216.272 262.47 218.981C262.47 221.497 261.599 223.626 259.857 225.368C258.309 226.916 256.18 227.69 253.47 227.69H246.794ZM169.283 90.3781C166.961 90.3781 165.026 89.7007 163.477 88.346C162.123 86.7977 161.445 84.8624 161.445 82.54C161.445 80.2176 162.123 78.379 163.477 77.0243C165.026 75.476 166.961 74.7019 169.283 74.7019H247.955C250.277 74.7019 252.116 75.476 253.47 77.0243C255.019 78.379 255.793 80.2176 255.793 82.54C255.793 84.8624 255.019 86.7977 253.47 88.346C252.116 89.7007 250.277 90.3781 247.955 90.3781H169.283Z"
            fill="#151F4A"
          />
          <path
            d="M519.933 131.04C521.094 118.654 524.481 107.719 530.094 98.2359C535.706 88.5592 542.963 81.0114 551.866 75.5925C560.769 70.1736 570.639 67.4641 581.477 67.4641C588.831 67.4641 594.54 68.335 598.604 70.0768C602.668 71.8186 604.217 74.9151 603.249 79.3664C602.669 82.2694 601.314 84.0112 599.185 84.5918C597.056 85.1724 594.443 85.2692 591.347 84.8821C588.444 84.3015 585.154 84.0112 581.477 84.0112C571.8 84.0112 563.188 86.0433 555.64 90.1075C548.092 94.1717 542.189 99.7842 537.932 106.945C533.674 113.912 531.545 121.944 531.545 131.04H519.933ZM522.836 228C520.32 228 518.191 227.226 516.449 225.678C514.901 223.936 514.127 221.807 514.127 219.291V77.9149C514.127 75.2054 514.901 73.0766 516.449 71.5283C518.191 69.98 520.32 69.2059 522.836 69.2059C525.545 69.2059 527.674 69.98 529.223 71.5283C530.771 73.0766 531.545 75.2054 531.545 77.9149V219.291C531.545 221.807 530.771 223.936 529.223 225.678C527.674 227.226 525.545 228 522.836 228Z"
            fill="#151F4A"
          />
          <path
            d="M696.724 296.801C695.563 296.801 694.208 296.511 692.66 295.93C687.435 293.801 685.983 290.221 688.306 285.189L785.846 73.8507C788.169 69.0124 791.749 67.5609 796.587 69.4962C801.813 71.6251 803.264 75.2054 800.942 80.2373L703.401 291.576C701.659 295.059 699.434 296.801 696.724 296.801ZM727.496 224.226C724.98 225.387 722.755 225.678 720.819 225.097C718.884 224.516 717.336 222.968 716.174 220.452L652.599 81.1082C651.437 78.5923 651.147 76.3666 651.728 74.4313C652.308 72.496 653.857 70.9477 656.373 69.7865C658.889 68.6253 661.114 68.335 663.049 68.9156C664.985 69.4962 666.533 71.0445 667.694 73.5604L731.27 212.904C732.431 215.42 732.721 217.646 732.141 219.581C731.56 221.517 730.012 223.065 727.496 224.226Z"
            fill="#151F4A"
          />
          <path
            d="M924.032 229.742C908.549 229.742 894.615 226.258 882.229 219.291C870.036 212.13 860.36 202.454 853.199 190.261C846.232 177.875 842.748 164.037 842.748 148.748C842.748 133.265 846.232 119.428 853.199 107.235C860.36 94.8491 870.036 85.1724 882.229 78.2052C894.615 71.0445 908.549 67.4641 924.032 67.4641C939.515 67.4641 953.352 71.0445 965.545 78.2052C977.738 85.1724 987.317 94.8491 994.285 107.235C1001.45 119.428 1005.03 133.265 1005.03 148.748L997.768 160.36C997.768 173.52 994.478 185.326 987.898 195.777C981.511 206.227 972.802 214.549 961.771 220.743C950.74 226.742 938.16 229.742 924.032 229.742ZM924.032 213.485C936.225 213.485 947.062 210.679 956.546 205.066C966.222 199.26 973.77 191.519 979.189 181.842C984.801 171.972 987.608 160.941 987.608 148.748C987.608 136.362 984.801 125.331 979.189 115.654C973.77 105.784 966.222 98.0424 956.546 92.4299C947.062 86.6239 936.225 83.7209 924.032 83.7209C912.033 83.7209 901.195 86.6239 891.518 92.4299C881.842 98.0424 874.197 105.784 868.585 115.654C862.972 125.331 860.166 136.362 860.166 148.748C860.166 160.941 862.972 171.972 868.585 181.842C874.197 191.519 881.842 199.26 891.518 205.066C901.195 210.679 912.033 213.485 924.032 213.485ZM996.317 228C993.801 228 991.672 227.226 989.93 225.678C988.382 223.936 987.608 221.807 987.608 219.291V166.166L993.123 148.748H1005.03V219.291C1005.03 221.807 1004.25 223.936 1002.7 225.678C1001.16 227.226 999.026 228 996.317 228Z"
            fill="#37B780"
          />
          <path
            d="M1083.4 131.04C1084.56 118.654 1087.95 107.719 1093.56 98.2359C1099.18 88.5592 1106.43 81.0114 1115.34 75.5925C1124.24 70.1736 1134.11 67.4641 1144.95 67.4641C1152.3 67.4641 1158.01 68.335 1162.07 70.0768C1166.14 71.8186 1167.69 74.9151 1166.72 79.3664C1166.14 82.2694 1164.78 84.0112 1162.65 84.5918C1160.53 85.1724 1157.91 85.2692 1154.82 84.8821C1151.91 84.3015 1148.62 84.0112 1144.95 84.0112C1135.27 84.0112 1126.66 86.0433 1119.11 90.1075C1111.56 94.1717 1105.66 99.7842 1101.4 106.945C1097.14 113.912 1095.02 121.944 1095.02 131.04H1083.4ZM1086.31 228C1083.79 228 1081.66 227.226 1079.92 225.678C1078.37 223.936 1077.6 221.807 1077.6 219.291V77.9149C1077.6 75.2054 1078.37 73.0766 1079.92 71.5283C1081.66 69.98 1083.79 69.2059 1086.31 69.2059C1089.02 69.2059 1091.14 69.98 1092.69 71.5283C1094.24 73.0766 1095.02 75.2054 1095.02 77.9149V219.291C1095.02 221.807 1094.24 223.936 1092.69 225.678C1091.14 227.226 1089.02 228 1086.31 228Z"
            fill="#37B780"
          />
          <path
            d="M1286.61 229.742C1271.51 229.742 1257.97 226.161 1245.97 219.001C1234.16 211.84 1224.78 202.163 1217.81 189.971C1211.03 177.778 1207.65 164.037 1207.65 148.748C1207.65 133.265 1210.84 119.428 1217.23 107.235C1223.61 95.0426 1232.42 85.4627 1243.65 78.4955C1254.87 71.3348 1267.74 67.7544 1282.26 67.7544C1294.64 67.7544 1305.96 70.1736 1316.22 75.0119C1326.48 79.6567 1335.38 86.8174 1342.93 96.4941C1344.48 98.4294 1345.06 100.462 1344.67 102.59C1344.28 104.719 1343.02 106.461 1340.9 107.816C1339.15 109.171 1337.22 109.751 1335.09 109.558C1332.96 109.171 1331.12 108.009 1329.57 106.074C1317.19 91.3655 1301.41 84.0112 1282.26 84.0112C1270.84 84.0112 1260.77 86.8174 1252.06 92.4299C1243.55 98.0424 1236.87 105.687 1232.03 115.364C1227.39 125.04 1225.07 136.168 1225.07 148.748C1225.07 160.941 1227.68 171.972 1232.9 181.842C1238.13 191.519 1245.29 199.26 1254.39 205.066C1263.68 210.679 1274.42 213.485 1286.61 213.485C1294.54 213.485 1302 212.324 1308.96 210.001C1316.12 207.679 1322.32 204.099 1327.54 199.26C1329.28 197.712 1331.22 196.841 1333.35 196.648C1335.48 196.454 1337.32 197.131 1338.86 198.68C1340.8 200.421 1341.77 202.454 1341.77 204.776C1341.96 206.905 1341.19 208.743 1339.44 210.292C1325.32 223.258 1307.7 229.742 1286.61 229.742Z"
            fill="#37B780"
          />
        </svg>
      </Link>
    </div>
  );
}
