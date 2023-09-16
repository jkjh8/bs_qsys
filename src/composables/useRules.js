export default function useRules() {
  const required = (v) => !!v || '필수 입력 항목 입니다.'
  const minLength = (v) => v.length >= 8 || '최소 8자 이상 입력하세요.'
  const minNumber = (v) => v > 0 || '0보다 큰 숫자를 입력하세요.'
  const maxNumber = (v) => v <= 65535 || '65535보다 작은 숫자를 입력하세요.'
  // email
  const ckEmail = (v) => /.+@.+\..+/.test(v) || '이메일 형식이 아닙니다.'
  //ipaddress
  const ckIPv4 = (v) =>
    /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm.test(
      v
    ) || 'IPv4 형식이 아닙니다'

  return { required, minLength, minNumber, maxNumber, ckEmail, ckIPv4 }
}
