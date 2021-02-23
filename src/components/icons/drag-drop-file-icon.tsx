/*!
 * © 2019 Atypon Systems LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'

import { IconProps } from './types'

const DragAndDropFileIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    className={props.className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="9"
      height="9"
      rx="1.5"
      stroke="#6E6E6E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="1 3"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 14C6 15.1046 6.89543 16 8 16H14C15.1046 16 16 15.1046 16 14V8C16 6.89543 15.1046 6 14 6H8C6.89543 6 6 6.89543 6 8L6 14ZM7 14C7 14.5523 7.44772 15 8 15H14C14.5523 15 15 14.5523 15 14V8C15 7.44771 14.5523 7 14 7H8C7.44772 7 7 7.44771 7 8V14Z"
      fill="#6E6E6E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.83935 4.60542L10.9832 6.04238C11.5351 6.5942 11.6888 7.50006 11.6888 8.28085C11.6888 9.06164 11.3847 9.79548 10.8329 10.3473C10.8329 10.3473 8.95965 11.8584 8.30272 11.8584H7.32974C6.22026 11.8584 5.31738 11.5709 5.31738 10.4614V9.65956L4.60411 8.94629C4.20879 8.55097 4.20879 7.90748 4.60411 7.51215C4.7548 7.3619 4.94443 7.2644 5.15013 7.22952C4.8854 6.83554 4.92699 6.29535 5.27489 5.94698C5.58972 5.63216 6.06105 5.56822 6.43937 5.7538C6.46665 5.53827 6.5628 5.32986 6.72825 5.16441C7.1115 4.78072 7.72816 4.76909 8.12617 5.12997C8.16417 4.93276 8.25988 4.75075 8.40521 4.60542C8.80097 4.20965 9.44359 4.20965 9.83935 4.60542Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.83935 4.60542L10.9832 6.04238C11.5351 6.5942 11.6888 7.50006 11.6888 8.28085C11.6888 9.06164 11.3847 9.79548 10.8329 10.3473C10.8329 10.3473 8.95965 11.8584 8.30272 11.8584H7.32974C6.22026 11.8584 5.31738 11.5709 5.31738 10.4614V9.65956L4.60411 8.94629C4.20879 8.55097 4.20879 7.90748 4.60411 7.51215C4.7548 7.3619 4.94443 7.2644 5.15013 7.22952C4.8854 6.83554 4.92699 6.29535 5.27489 5.94698C5.58972 5.63216 6.06105 5.56822 6.43937 5.7538C6.46665 5.53827 6.5628 5.32986 6.72825 5.16441C7.1115 4.78072 7.72816 4.76909 8.12617 5.12997C8.16417 4.93276 8.25988 4.75075 8.40521 4.60542C8.80097 4.20965 9.44359 4.20965 9.83935 4.60542ZM8.30316 11.4111C8.84023 11.4111 10.5172 10.0311 10.5172 10.0311C10.9845 9.56379 11.2421 8.94172 11.2421 8.28077C11.2421 7.61981 11.1349 6.82579 10.6676 6.35848L9.5237 4.92152C9.30949 4.70731 8.9361 4.70731 8.72189 4.92152C8.50097 5.14244 8.50097 5.50242 8.72189 5.72334L8.82965 5.83111C8.87348 5.87494 8.89495 5.93216 8.89495 5.98941C8.89495 6.04666 8.87302 6.10388 8.82965 6.14772C8.74245 6.23492 8.60068 6.23492 8.51348 6.14772L7.84672 5.48096C7.6258 5.26004 7.26582 5.26004 7.0449 5.48096C6.93758 5.58784 6.87855 5.73049 6.87855 5.88165C6.87855 6.0328 6.93758 6.17545 7.04446 6.28233L7.71122 6.94909C7.75505 6.99293 7.77652 7.05015 7.77652 7.1074C7.77652 7.16465 7.75505 7.22187 7.71122 7.2657C7.62402 7.35291 7.48226 7.35291 7.39505 7.2657L6.3929 6.26311C6.17198 6.04219 5.812 6.04219 5.59108 6.26311C5.37017 6.48403 5.37017 6.84401 5.59108 7.06493L6.59324 8.06708C6.63707 8.11091 6.65853 8.16814 6.65853 8.22539C6.65853 8.28263 6.63661 8.33986 6.59324 8.38369C6.50603 8.47089 6.36427 8.47089 6.27707 8.38369L5.7221 7.82872C5.50789 7.61451 5.13449 7.61451 4.92028 7.82872C4.81339 7.93561 4.75436 8.07825 4.75436 8.22941C4.75436 8.38057 4.81339 8.52321 4.92028 8.6301L6.59321 10.303C6.63705 10.3469 6.65851 10.4041 6.65851 10.4613C6.65851 10.5186 6.63659 10.5758 6.59321 10.6196C6.50601 10.7068 6.36425 10.7068 6.27704 10.6196L5.76457 10.1067V10.4613C5.76457 11.3244 6.46667 11.4111 7.32974 11.4111H8.30316Z"
      fill="#6E6E6E"
    />
    <path
      d="M10.9832 6.04238L10.7876 6.19808L10.7964 6.20915L10.8064 6.21916L10.9832 6.04238ZM9.83935 4.60542L10.0349 4.44972L10.0261 4.43864L10.0161 4.42864L9.83935 4.60542ZM10.8329 10.3473L10.9899 10.5419L11.0003 10.5335L11.0097 10.5241L10.8329 10.3473ZM5.31738 9.65956H5.56738V9.55601L5.49416 9.48279L5.31738 9.65956ZM4.60411 8.94629L4.78089 8.76951L4.60411 8.94629ZM4.60411 7.51215L4.42759 7.33512L4.42733 7.33538L4.60411 7.51215ZM5.15013 7.22952L5.19192 7.47601L5.57347 7.41131L5.35763 7.09009L5.15013 7.22952ZM5.27489 5.94698L5.09812 5.77021L5.098 5.77032L5.27489 5.94698ZM6.43937 5.7538L6.32928 5.97825L6.64347 6.13237L6.6874 5.78518L6.43937 5.7538ZM6.72825 5.16441L6.90503 5.34119L6.90513 5.34108L6.72825 5.16441ZM8.12617 5.12997L7.95824 5.31517L8.28754 5.61376L8.37165 5.17728L8.12617 5.12997ZM8.40521 4.60542L8.22844 4.42864L8.22844 4.42864L8.40521 4.60542ZM10.5172 10.0311L10.676 10.2242L10.6854 10.2165L10.694 10.2079L10.5172 10.0311ZM10.6676 6.35848L10.472 6.51418L10.4808 6.52525L10.4908 6.53526L10.6676 6.35848ZM9.5237 4.92152L9.7193 4.76582L9.71049 4.75475L9.70048 4.74475L9.5237 4.92152ZM8.72189 4.92152L8.89866 5.0983L8.89866 5.0983L8.72189 4.92152ZM8.72189 5.72334L8.89866 5.54656L8.89866 5.54656L8.72189 5.72334ZM8.82965 5.83111L8.65287 6.00788L8.65287 6.00788L8.82965 5.83111ZM8.82965 6.14772L9.00643 6.3245L9.00736 6.32356L8.82965 6.14772ZM8.51348 6.14772L8.3367 6.32449L8.3367 6.32449L8.51348 6.14772ZM7.84672 5.48096L8.0235 5.30418V5.30418L7.84672 5.48096ZM7.0449 5.48096L7.22132 5.6581L7.22168 5.65773L7.0449 5.48096ZM7.39505 7.2657L7.21824 7.44244L7.21828 7.44248L7.39505 7.2657ZM6.3929 6.26311L6.56972 6.08637L6.56968 6.08634L6.3929 6.26311ZM5.59108 6.26311L5.41431 6.08634V6.08634L5.59108 6.26311ZM5.59108 7.06493L5.41431 7.24171H5.41431L5.59108 7.06493ZM6.59324 8.06708L6.77001 7.8903L6.59324 8.06708ZM6.59324 8.38369L6.77001 8.56047L6.77095 8.55953L6.59324 8.38369ZM6.27707 8.38369L6.10029 8.56047H6.10029L6.27707 8.38369ZM5.7221 7.82872L5.89887 7.65195L5.7221 7.82872ZM4.92028 7.82872L5.09706 8.0055H5.09706L4.92028 7.82872ZM4.92028 8.6301L4.7435 8.80688L4.7435 8.80688L4.92028 8.6301ZM6.59321 10.303L6.76999 10.1263L6.76999 10.1263L6.59321 10.303ZM6.59321 10.6196L6.76999 10.7964L6.77092 10.7955L6.59321 10.6196ZM6.27704 10.6196L6.10019 10.7963L6.10027 10.7964L6.27704 10.6196ZM5.76457 10.1067L5.94142 9.93003L5.51457 9.50281V10.1067H5.76457ZM11.1788 5.88668L10.0349 4.44972L9.64375 4.76112L10.7876 6.19808L11.1788 5.88668ZM11.9388 8.28085C11.9388 7.48595 11.7859 6.49147 11.16 5.8656L10.8064 6.21916C11.2842 6.69694 11.4388 7.51416 11.4388 8.28085H11.9388ZM11.0097 10.5241C11.6084 9.92538 11.9388 9.12796 11.9388 8.28085H11.4388C11.4388 8.99533 11.1611 9.66558 10.6561 10.1705L11.0097 10.5241ZM8.30272 12.1084C8.42712 12.1084 8.55991 12.0738 8.68518 12.0285C8.81384 11.9819 8.95198 11.9173 9.09204 11.8433C9.3722 11.6952 9.67688 11.5003 9.95563 11.309C10.2353 11.117 10.4935 10.9255 10.6815 10.7822C10.7756 10.7105 10.8524 10.6507 10.9057 10.6087C10.9324 10.5877 10.9533 10.5711 10.9676 10.5597C10.9747 10.5541 10.9802 10.5497 10.984 10.5467C10.9858 10.5452 10.9873 10.544 10.9883 10.5432C10.9888 10.5428 10.9891 10.5425 10.9894 10.5423C10.9895 10.5422 10.9897 10.5421 10.9897 10.542C10.9898 10.542 10.9898 10.542 10.9898 10.5419C10.9899 10.5419 10.9899 10.5419 10.8329 10.3473C10.676 10.1527 10.676 10.1527 10.676 10.1527C10.676 10.1527 10.676 10.1527 10.6759 10.1527C10.6759 10.1528 10.6758 10.1528 10.6758 10.1529C10.6756 10.153 10.6753 10.1533 10.6749 10.1536C10.6741 10.1543 10.6728 10.1553 10.6711 10.1566C10.6677 10.1593 10.6626 10.1634 10.6559 10.1688C10.6424 10.1796 10.6224 10.1955 10.5965 10.2158C10.5449 10.2564 10.4702 10.3146 10.3784 10.3846C10.1946 10.5246 9.94346 10.7109 9.67271 10.8967C9.40103 11.0832 9.11422 11.266 8.85838 11.4012C8.73043 11.4689 8.61445 11.5223 8.51493 11.5584C8.41201 11.5956 8.34256 11.6084 8.30272 11.6084V12.1084ZM7.32974 12.1084H8.30272V11.6084H7.32974V12.1084ZM5.06738 10.4614C5.06738 10.7731 5.13102 11.0426 5.25742 11.2694C5.38421 11.4969 5.56652 11.6676 5.78243 11.7924C6.20517 12.0366 6.76277 12.1084 7.32974 12.1084V11.6084C6.78722 11.6084 6.33865 11.5363 6.03258 11.3595C5.88409 11.2737 5.77133 11.1645 5.69417 11.026C5.61661 10.8869 5.56738 10.7044 5.56738 10.4614H5.06738ZM5.06738 9.65956V10.4614H5.56738V9.65956H5.06738ZM4.42733 9.12307L5.14061 9.83634L5.49416 9.48279L4.78089 8.76951L4.42733 9.12307ZM4.42733 7.33538C3.93438 7.82833 3.93438 8.63011 4.42733 9.12307L4.78089 8.76951C4.48319 8.47182 4.48319 7.98662 4.78089 7.68893L4.42733 7.33538ZM5.10833 6.98304C4.85128 7.02663 4.61468 7.14858 4.42759 7.33512L4.78063 7.68919C4.89493 7.57522 5.03757 7.50218 5.19192 7.47601L5.10833 6.98304ZM5.098 5.77032C4.664 6.2049 4.61261 6.87782 4.94262 7.36895L5.35763 7.09009C5.15819 6.79327 5.18997 6.38581 5.45179 6.12364L5.098 5.77032ZM6.54947 5.52935C6.07842 5.29828 5.49107 5.37726 5.09812 5.77021L5.45167 6.12376C5.68838 5.88705 6.04369 5.83816 6.32928 5.97825L6.54947 5.52935ZM6.55148 4.98763C6.34532 5.19378 6.22532 5.45397 6.19135 5.72242L6.6874 5.78518C6.70797 5.62257 6.78027 5.46594 6.90503 5.34119L6.55148 4.98763ZM8.29409 4.94477C7.79792 4.49487 7.02949 4.50907 6.55137 4.98773L6.90513 5.34108C7.19352 5.05237 7.65841 5.04331 7.95824 5.31517L8.29409 4.94477ZM8.22844 4.42864C8.04773 4.60935 7.92813 4.83648 7.88068 5.08266L8.37165 5.17728C8.40022 5.02904 8.47204 4.89214 8.58199 4.78219L8.22844 4.42864ZM10.0161 4.42864C9.52273 3.93525 8.72183 3.93525 8.22844 4.42864L8.58199 4.78219C8.88012 4.48406 9.36444 4.48406 9.66257 4.78219L10.0161 4.42864ZM10.5172 10.0311C10.3583 9.83807 10.3583 9.83807 10.3583 9.83807C10.3583 9.83807 10.3583 9.83808 10.3583 9.83809C10.3583 9.83811 10.3582 9.83816 10.3581 9.83823C10.358 9.83836 10.3577 9.83858 10.3574 9.83888C10.3566 9.83947 10.3555 9.84039 10.354 9.84163C10.351 9.84411 10.3464 9.84784 10.3404 9.85275C10.3283 9.86257 10.3104 9.87708 10.2874 9.89562C10.2413 9.93272 10.1746 9.98587 10.0929 10.0497C9.92917 10.1776 9.706 10.3476 9.46694 10.5172C9.22693 10.6875 8.97542 10.854 8.75422 10.977C8.64351 11.0385 8.54486 11.0866 8.46206 11.1188C8.37482 11.1526 8.32412 11.1611 8.30316 11.1611V11.6611C8.41647 11.6611 8.53566 11.6265 8.64293 11.5849C8.75464 11.5416 8.87511 11.4818 8.99715 11.414C9.24142 11.2782 9.50985 11.0998 9.75622 10.925C10.0035 10.7496 10.2332 10.5746 10.4007 10.4437C10.4845 10.3782 10.5531 10.3236 10.6008 10.2852C10.6247 10.266 10.6433 10.2509 10.6561 10.2405C10.6625 10.2353 10.6674 10.2313 10.6707 10.2285C10.6724 10.2271 10.6737 10.2261 10.6746 10.2254C10.675 10.225 10.6754 10.2247 10.6756 10.2245C10.6757 10.2244 10.6758 10.2243 10.6759 10.2243C10.6759 10.2242 10.676 10.2242 10.676 10.2242C10.676 10.2242 10.676 10.2242 10.5172 10.0311ZM10.9921 8.28077C10.9921 8.87542 10.7608 9.4339 10.3404 9.85434L10.694 10.2079C11.2082 9.69367 11.4921 9.00801 11.4921 8.28077H10.9921ZM10.4908 6.53526C10.6815 6.72597 10.8089 6.99424 10.8876 7.30787C10.9661 7.62047 10.9921 7.962 10.9921 8.28077H11.4921C11.4921 7.93858 11.4646 7.55262 11.3726 7.18614C11.2808 6.8207 11.1209 6.4583 10.8443 6.18171L10.4908 6.53526ZM9.32811 5.07722L10.472 6.51418L10.8632 6.20278L9.7193 4.76582L9.32811 5.07722ZM8.89866 5.0983C9.01524 4.98172 9.23035 4.98172 9.34693 5.0983L9.70048 4.74475C9.38864 4.4329 8.85695 4.4329 8.54511 4.74475L8.89866 5.0983ZM8.89866 5.54656C8.77537 5.42328 8.77537 5.22159 8.89866 5.0983L8.54511 4.74475C8.22656 5.0633 8.22656 5.58157 8.54511 5.90012L8.89866 5.54656ZM9.00643 5.65433L8.89866 5.54656L8.54511 5.90012L8.65287 6.00788L9.00643 5.65433ZM9.14495 5.98941C9.14495 5.86951 9.09966 5.74757 9.00643 5.65433L8.65287 6.00788C8.65051 6.00552 8.6483 6.00225 8.64682 5.99858C8.64543 5.99512 8.64495 5.99198 8.64495 5.98941H9.14495ZM9.00736 6.32356C9.09843 6.23152 9.14495 6.1105 9.14495 5.98941H8.64495C8.64495 5.98281 8.64761 5.97625 8.65194 5.97188L9.00736 6.32356ZM8.3367 6.32449C8.52154 6.50933 8.82159 6.50933 9.00643 6.32449L8.65287 5.97094C8.6633 5.96051 8.67983 5.96051 8.69026 5.97094L8.3367 6.32449ZM7.66995 5.65773L8.3367 6.32449L8.69026 5.97094L8.0235 5.30418L7.66995 5.65773ZM7.22168 5.65773C7.34497 5.53445 7.54666 5.53445 7.66995 5.65773L8.0235 5.30418C7.70495 4.98563 7.18668 4.98563 6.86813 5.30418L7.22168 5.65773ZM7.12855 5.88165C7.12855 5.79678 7.16123 5.71794 7.22132 5.6581L6.86849 5.30382C6.71393 5.45775 6.62855 5.66419 6.62855 5.88165H7.12855ZM7.22124 6.10556C7.16128 6.0456 7.12855 5.96656 7.12855 5.88165H6.62855C6.62855 6.09904 6.71387 6.3053 6.86769 6.45911L7.22124 6.10556ZM7.888 6.77232L7.22124 6.10556L6.86769 6.45911L7.53445 7.12587L7.888 6.77232ZM8.02652 7.1074C8.02652 6.9875 7.98124 6.86555 7.888 6.77232L7.53445 7.12587C7.53208 7.1235 7.52987 7.12024 7.52839 7.11657C7.527 7.1131 7.52652 7.10996 7.52652 7.1074H8.02652ZM7.888 7.44248C7.98124 7.34925 8.02652 7.2273 8.02652 7.1074H7.52652C7.52652 7.10483 7.527 7.10169 7.52839 7.09823C7.52987 7.09456 7.53208 7.09129 7.53445 7.08893L7.888 7.44248ZM7.21828 7.44248C7.40311 7.62731 7.70317 7.62731 7.888 7.44248L7.53445 7.08893C7.54488 7.0785 7.5614 7.0785 7.57183 7.08893L7.21828 7.44248ZM6.21609 6.43985L7.21824 7.44244L7.57187 7.08897L6.56972 6.08637L6.21609 6.43985ZM5.76786 6.43989C5.89115 6.3166 6.09284 6.3166 6.21613 6.43989L6.56968 6.08634C6.25113 5.76779 5.73286 5.76779 5.41431 6.08634L5.76786 6.43989ZM5.76786 6.88815C5.64457 6.76487 5.64457 6.56318 5.76786 6.43989L5.41431 6.08634C5.09576 6.40489 5.09576 6.92316 5.41431 7.24171L5.76786 6.88815ZM6.77001 7.8903L5.76786 6.88815L5.41431 7.24171L6.41646 8.24386L6.77001 7.8903ZM6.90853 8.22539C6.90853 8.10549 6.86325 7.98354 6.77001 7.8903L6.41646 8.24386C6.41409 8.24149 6.41188 8.23823 6.41041 8.23456C6.40901 8.23109 6.40853 8.22795 6.40853 8.22539H6.90853ZM6.77095 8.55953C6.86202 8.46749 6.90853 8.34648 6.90853 8.22539H6.40853C6.40853 8.21879 6.4112 8.21223 6.41553 8.20785L6.77095 8.55953ZM6.10029 8.56047C6.28512 8.7453 6.58518 8.7453 6.77001 8.56047L6.41646 8.20691C6.42689 8.19649 6.44341 8.19649 6.45384 8.20691L6.10029 8.56047ZM5.54532 8.0055L6.10029 8.56047L6.45384 8.20692L5.89887 7.65195L5.54532 8.0055ZM5.09706 8.0055C5.21364 7.88892 5.42874 7.88892 5.54532 8.0055L5.89887 7.65195C5.58703 7.3401 5.05534 7.3401 4.7435 7.65195L5.09706 8.0055ZM5.00436 8.22941C5.00436 8.14449 5.0371 8.06545 5.09706 8.0055L4.7435 7.65195C4.58969 7.80576 4.50436 8.01201 4.50436 8.22941H5.00436ZM5.09706 8.45332C5.0371 8.39337 5.00436 8.31433 5.00436 8.22941H4.50436C4.50436 8.44681 4.58969 8.65306 4.7435 8.80688L5.09706 8.45332ZM6.76999 10.1263L5.09706 8.45332L4.7435 8.80688L6.41644 10.4798L6.76999 10.1263ZM6.90851 10.4613C6.90851 10.3414 6.86323 10.2195 6.76999 10.1263L6.41644 10.4798C6.41407 10.4774 6.41186 10.4742 6.41039 10.4705C6.40899 10.467 6.40851 10.4639 6.40851 10.4613H6.90851ZM6.77092 10.7955C6.862 10.7034 6.90851 10.5824 6.90851 10.4613H6.40851C6.40851 10.4547 6.41117 10.4482 6.41551 10.4438L6.77092 10.7955ZM6.10027 10.7964C6.2851 10.9813 6.58516 10.9813 6.76999 10.7964L6.41644 10.4429C6.42687 10.4324 6.44339 10.4324 6.45382 10.4429L6.10027 10.7964ZM5.58771 10.2834L6.10019 10.7963L6.4539 10.4429L5.94142 9.93003L5.58771 10.2834ZM6.01457 10.4613V10.1067H5.51457V10.4613H6.01457ZM7.32974 11.1611C6.89246 11.1611 6.55447 11.1363 6.32744 11.0325C6.22197 10.9843 6.14955 10.9227 6.10095 10.8433C6.05145 10.7625 6.01457 10.6434 6.01457 10.4613H5.51457C5.51457 10.7108 5.56545 10.9263 5.67456 11.1044C5.78457 11.2841 5.94162 11.4059 6.11956 11.4873C6.45935 11.6426 6.90394 11.6611 7.32974 11.6611V11.1611ZM8.30316 11.1611H7.32974V11.6611H8.30316V11.1611Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default DragAndDropFileIcon
