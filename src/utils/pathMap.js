/**
 * base request uri
 */
export const BASE_URI = 'http://157.122.54.189:9089';

/**
 * 登录 获取验证码
 */
export const ACCOUNT_LOGIN = '/user/login';

/**
 * 检查验证码
 */
export const ACCOUNT_VALIDATE_CODE = '/user/loginVerification';

/**
 * 上传头像
 */
export const ACCOUNT_CHECKHEADIMAGE = '/user/loginReginfo/head';

/**
 * 新用户保存个人信息
 */
export const ACCOUNT_SAVE = '/user/loginReginfo';

/**
 * 最近来访
 */
export const FRIEND_VISTORS = '/friends/visitors';

/**
 * 今日佳人
 */
export const FRIEND_TODAY_BEST = '/friends/todayBest';

/**
 * 推荐朋友列表
 */
export const FRIEND_RECOMMEND = '/friends/recommendation';

/**
 * 探花滑动的列表数据
 */
export const FRIEND_CARDS = '/friends/cards';

/**
 * 探花-喜欢、不喜欢
 */
export const FRIEND_SELECT = (id, type) => `/friends/like/${id}/${type}`;

/**
 * 搜附近
 */
export const FRIEND_SEARCH = '/friends/search';

/**
 * 测灵魂问题
 */
export const FRIEND_QUESTIONS = '/friends/questions';

/**
 * 问题列表
 */
export const FRIEND_QUESTION_LIST = (id) => `/friends/questionSection/${id}`;

/**
 * 获取用户信息
 */
export const MY_INFO = '/my/userinfo';

/**
 * 提交答案
 * @param {number} id 
 */
export const FRIEND_QUESTION_SUBMIT = (id) => `/friends/questionsAns/${id}`;

/**
 * 朋友详情
 * @param {number} id 
 */
export const FRIEND_DETAIL = (id) => `/friends/personalInfo/${id}`;