# Leo Game

Starter kit cho game mobile (iOS / Android / Web), dựng bằng **Expo SDK 58 + React Native 0.88 + TypeScript**.
Mọi thư viện đều miễn phí, mã nguồn mở.

## Chạy thử

```bash
npm install
npx expo start        # quét QR bằng Expo Go, hoặc nhấn a / i / w
npm run typecheck
```

> Skia, Reanimated, expo-gl… là thư viện native. Nếu Expo Go báo thiếu module, tạo development build:
> `npx expo run:android` / `npx expo run:ios`, hoặc `npx eas-cli build --profile development`.

## Thư viện đã cài

| Nhóm | Thư viện | Dùng để |
|---|---|---|
| Đồ hoạ 2D | `@shopify/react-native-skia` | Vẽ sprite, hình, shader, hiệu ứng |
| Đồ hoạ 3D | `three` + `expo-gl` | Game 3D (WebGL) |
| Vector | `react-native-svg` | Icon, UI vector |
| Vật lý | `matter-js` | Va chạm, trọng lực 2D |
| Animation | `react-native-reanimated`, `react-native-worklets` | Animation 60fps trên UI thread |
| Input | `react-native-gesture-handler`, `expo-sensors` | Chạm, vuốt, nghiêng máy (gia tốc kế, con quay) |
| Âm thanh | `expo-audio` | Nhạc nền, hiệu ứng âm thanh |
| Rung | `expo-haptics` | Phản hồi rung khi chạm/va chạm |
| State | `zustand` | Quản lý điểm, level, trạng thái game |
| Lưu trữ | `@react-native-async-storage/async-storage` | Lưu high score, save game |
| Asset | `expo-asset`, `expo-font`, `expo-image` | Nạp ảnh, font, sprite |
| Màn hình | `expo-screen-orientation`, `expo-keep-awake`, `expo-splash-screen`, `expo-linear-gradient` | Khoá xoay, giữ màn hình sáng, splash, nền |
| Hạ tầng | `react-native-safe-area-context`, `react-native-screens`, `expo-dev-client`, `react-native-web` | Tai thỏ, điều hướng, dev build, chạy web |

## Cấu trúc

```
App.tsx                    # root: gesture + safe area
src/engine/useGameLoop.ts  # vòng lặp game (requestAnimationFrame)
src/engine/physics.ts      # thế giới matter-js
src/store/useGameStore.ts  # zustand + lưu high score
src/game/GameScreen.tsx    # demo: chạm để thả bóng (vẽ bằng Skia)
legacy/pgmp-practice.html  # app PgMP cũ
```

Thêm thư viện mới: luôn dùng `npx expo install <tên>` để lấy đúng version tương thích SDK.
