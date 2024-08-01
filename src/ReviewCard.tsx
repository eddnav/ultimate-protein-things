import { Row } from "@tanstack/table-core";
import { Tier } from "./models/Tier";
import { Review } from "./models/Review";
import { ProductType } from "./models/ProductType";

export function ReviewCard({ row }: { row: Row<Review> }) {
    return <div className='card'>
        <div className="card-content">
            <div className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img src={row.original.product.imageUrl} />
                    </figure>
                </div>
                <div className="media-content no-scrolling">
                    <p className="subtitle is-6 text-ellipsis">{row.original.product.brand}</p>
                    <p className="title is-4 ">{row.original.product.name}</p>
                </div>
                <div className='media-right'>
                    <span className={`tag is-large ${Tier.getTagClassName(row.original.tier)}`}>{row.original.tier}</span>
                </div>
            </div>
            <div>
                <div className="columns">
                    <div className="column">
                        <h4 className='title is-4'>Good</h4>
                        {row.original.pros.map(data =>
                            <div className="icon-text">
                                <span className="icon has-text-success">
                                    <i className="fa-solid fa-plus"></i>
                                </span>
                                <span>{data}</span>
                            </div>
                        )}
                    </div>
                    <div className="column">
                        <h4 className='title is-4'>Bad</h4>
                        {row.original.cons.map(data =>
                            <div className="icon-text">
                                <span className="icon has-text-danger">
                                    <i className="fa-solid fa-minus"></i>
                                </span>
                                <span>{data}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <h4 className='title is-4'>About</h4>
                    <div className="icon-text">
                        <span className="icon has-text-info">
                            <i className="fa-solid fa-comment-dots"></i>
                        </span>
                        <span>{row.original.comparison}</span>
                    </div>
                    <div className="icon-text">
                        <span className="icon has-text-info">
                            <i className="fa-solid fa-puzzle-piece"></i>
                        </span>
                        <span>{ProductType.toString(row.original.product.type)}</span>
                    </div>
                    <div className="icon-text">
                        <span className="icon has-text-info">
                            <i className="fa-solid fa-fire"></i>
                        </span>
                        <span>{`${row.original.product.caloriesInKcal}kcal per portion`}</span>
                    </div>
                    <div className="icon-text">
                        <span className="icon has-text-info">
                            <i className="fa-solid fa-dumbbell"></i>
                        </span>
                        <span>{`${row.original.product.proteinInGrams}g of protein per portion`}</span>
                    </div>
                    <div className="icon-text">
                        <span className="icon has-text-info">
                            <i className="fa-solid fa-weight-hanging"></i>
                        </span>
                        <span>{`${row.original.product.weightInGrams}g per portion`}</span>
                    </div>
                    <div className="icon-text">
                        <span className="icon has-text-info">
                            <i className="fa-solid fa-calendar"></i>
                        </span>
                        <span>Reviewed in {row.original.reviewYear}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}