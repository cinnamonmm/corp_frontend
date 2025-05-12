import React from 'react';
import Button from '@/components/Button';
import './styles.scss';

export default function SassDemo() {
  return (
    <div className="sass-demo">
      <h1 className="sass-demo__title">SASS スタイリングのデモ</h1>

      <section className="sass-demo__section">
        <h2>ボタンのバリエーション</h2>
        <div className="sass-demo__buttons">
          <Button variant="primary">プライマリボタン</Button>
          <Button variant="secondary">セカンダリボタン</Button>
          <Button variant="accent">アクセントボタン</Button>
          <Button variant="outline">アウトラインボタン</Button>
        </div>
      </section>

      <section className="sass-demo__section">
        <h2>ボタンのサイズ</h2>
        <div className="sass-demo__buttons">
          <Button size="sm">小さいボタン</Button>
          <Button size="md">中サイズボタン</Button>
          <Button size="lg">大きいボタン</Button>
        </div>
      </section>

      <section className="sass-demo__section">
        <h2>全幅ボタン</h2>
        <Button fullWidth>全幅ボタン</Button>
      </section>

      <section className="sass-demo__section">
        <h2>無効化されたボタン</h2>
        <div className="sass-demo__buttons">
          <Button disabled>無効化ボタン</Button>
          <Button variant="outline" disabled>無効化アウトラインボタン</Button>
        </div>
      </section>
    </div>
  );
}