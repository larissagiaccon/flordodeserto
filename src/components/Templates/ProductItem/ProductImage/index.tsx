import { useState } from 'react'

import Link from 'next/link'

import { IProductCarouselProps } from 'store/modules/product'

import { variationsColors } from 'mocks/mockedProduct' // TODO REMOVER MOCK

import * as S from './styles'

interface IProductImageProps {
    product: IProductCarouselProps
    setShowModalSeeMoreDetails(state: boolean): void
}

export default function ProductImage({
    product,
    setShowModalSeeMoreDetails
}: IProductImageProps) {
    const [hoverEffect, setHoverEffect] = useState(false)
    const [featuredProduct, setFeaturedProduct] = useState({
        sku: product.sku,
        imagem: product.imagemPrincipal.grande,
        tamanhos: product.tamanhos
    })

    return (
        <S.Container className="product-image">
            <Link href={product.permalink} passHref>
                <S.Content
                    href=""
                    className="images-video-group"
                    onMouseEnter={() => {
                        if (product.imagens.length > 0 || product.videoUrl)
                            setHoverEffect(true)
                    }}
                    onMouseLeave={() => {
                        setHoverEffect(false)
                    }}
                    hoverEffect={hoverEffect}
                    title={product.nome}
                >
                    {[product.imagemPrincipal]
                        .concat(product.imagens)
                        .slice(0, 2)
                        .map((item, index) => (
                            <>
                                {index !== 1 ? (
                                    <img
                                        key={index}
                                        loading="lazy"
                                        src={featuredProduct.imagem}
                                        alt={product.nome}
                                    />
                                ) : (
                                    <>
                                        {product.videoUrl !== null &&
                                        product.videoUrl !== '' ? (
                                            <video
                                                key={index}
                                                autoPlay
                                                loop
                                                muted
                                            >
                                                <source
                                                    src={product.videoUrl}
                                                    type="video/mp4"
                                                />

                                                {item ? (
                                                    <img
                                                        key={index}
                                                        loading="lazy"
                                                        src={item.grande}
                                                        alt={product.nome}
                                                    />
                                                ) : (
                                                    'Seu navegador não suporta a tag de vídeo.'
                                                )}
                                            </video>
                                        ) : (
                                            <img
                                                key={index}
                                                loading="lazy"
                                                src={item.grande}
                                                alt={product.nome}
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        ))}
                </S.Content>
            </Link>

            <div className="variations-group">
                <div className="variations-color">
                    <p
                        key={0}
                        style={{
                            background: `${
                                variationsColors.find(
                                    color => color.name === product.cor
                                )?.color || '#000'
                            }`
                        }}
                        title={product.cor}
                        className={`variation-color${
                            product.disponivel ? ' available' : ' unavailable'
                        }${
                            product.sku === featuredProduct.sku
                                ? ' selected'
                                : ' not-selected'
                        }`}
                        onClick={() => {
                            setFeaturedProduct({
                                sku: product.sku,
                                imagem: product.imagemPrincipal.grande,
                                tamanhos: product.tamanhos
                            })
                        }}
                    />

                    {product.variacoes.map((item, index) => (
                        <p
                            key={index + 1}
                            style={{
                                background: `${
                                    variationsColors.find(
                                        color => color.name === item.cor
                                    )?.color || '#000'
                                }`
                            }}
                            title={item.cor}
                            className={`variation-color${
                                item.disponivel ? ' available' : ' unavailable'
                            }${
                                item.sku === featuredProduct.sku
                                    ? ' selected'
                                    : ' not-selected'
                            }`}
                            onClick={() => {
                                setFeaturedProduct({
                                    sku: item.sku,
                                    imagem: item.imagemPrincipal.grande,
                                    tamanhos: item.tamanhos
                                })
                            }}
                        />
                    ))}
                </div>

                <div className="variations-size">
                    {featuredProduct.tamanhos.map((item, index) => (
                        <p
                            key={index}
                            className={`variation-size${
                                item.disponivel ? ' available' : ' unavailable'
                            }`}
                        >
                            {item.tamanho}
                        </p>
                    ))}
                </div>
            </div>
        </S.Container>
    )
}
