import React, { Component } from "react";
import Fade from "react-awesome-reveal";
import ReactCardFlip from "react-card-flip";
import { ProficiencyLevel } from "./enums/proficiencyLevels";
import { Categories } from "./enums/categories";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLevel: null,
      sortBy: "level",
      selectedCategory: null,
      selectedCardId: null,
    };
  }

  handleFilterChange = (level) => {
    this.setState({ selectedLevel: level });
  };

  handleSortChange = (sortBy) => {
    this.setState({ sortBy });
  };

  handleCategoryChange = (event) => {
    this.setState({ selectedCategory: event.target.value });
  };

  handleCardClick = (cardId) => {
    this.setState((prevState) => ({
      selectedCardId: prevState.selectedCardId === cardId ? null : cardId,
    }), () => {
      const portfolioWrapper = document.getElementById('portfolio-wrapper');
      if (this.state.selectedCardId !== null) {
        portfolioWrapper.classList.add('expanded');
      } else {
        portfolioWrapper.classList.remove('expanded');
      }
    });

  };

  render() {
    const { selectedLevel, sortBy, selectedCategory, selectedCardId } = this.state;
    const { data } = this.props;

    const proficiencies = data && data.proficiencies ? data.proficiencies : [];

    const mappedProficiencies = proficiencies.map((proficiency) => ({
      ...proficiency,
      categories: proficiency.categories.map(
        (category) => Categories[category] || category
      ),
    }));

    let filteredProficiencies = mappedProficiencies;
    if (selectedLevel) {
      filteredProficiencies = filteredProficiencies.filter(
        (proficiency) => proficiency.level === selectedLevel
      );
    }

    if (selectedCategory) {
      filteredProficiencies = filteredProficiencies.filter(
        (proficiency) => proficiency.categories.includes(selectedCategory)
      );
    }

    if (sortBy) {
      filteredProficiencies.sort((a, b) => {
        if (sortBy === "name") {
          return a.title.localeCompare(b.title);
        } else if (sortBy === "level") {
          const levels = {
            [ProficiencyLevel.Beginner]: 3,
            [ProficiencyLevel.Intermediate]: 2,
            [ProficiencyLevel.Expert]: 1,
          };
          return levels[a.level] - levels[b.level];
        }
        return 0;
      });
    }

    const proficiencyItems = filteredProficiencies.map((proficiency) => (
      <ReactCardFlip
        isFlipped={selectedCardId === proficiency.id}
        flipDirection="horizontal"
        key={proficiency.id}
      >
        <div
          onClick={() => this.handleCardClick(proficiency.id)}
          className="portfolio-link"
        >
          <div className=" portfolio-item">
            <div className="item-wrap" style={{ padding: "10px" }}>
              <div style={{ textAlign: "left", fontWeight: "bold" }}>
                {proficiency.title}
              </div>
              <div
                style={{
                  textAlign: "left",
                  fontStyle: "italic",
                  paddingLeft: "5px",
                }}
              >
                {proficiency.level}
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => this.handleCardClick(null)}
          className={`portfolio-link  portfolio-item ${selectedCardId === proficiency.id ? "expanded-card" : ""
            }`}
        >
          <div className="item-wrap" style={{ padding: "10px" }}>
            <div style={{ textAlign: "left", fontWeight: "bold" }}>
              {proficiency.title}
            </div>
            <div
              style={{
                textAlign: "left",
                fontStyle: "italic",
                paddingLeft: "5px",
                fontSize: "13px",
                lineHeight: "1.2"
              }}
            >
              {proficiency.summary}
            </div>
          </div>
        </div>
      </ReactCardFlip>
    ));

    return (
      <section id="portfolio">
        <Fade left duration={1000} distance="40px" triggerOnce>
          <div className="row">
            <div className="twelve columns collapsed">
              <h1>Other platform experience and proficiencies</h1>

              <div className="controls-row">
                <div className="filter-buttons">
                  <button
                    className={`inline-button-start filter-button ${selectedLevel === null ? "selected" : ""
                      }`}
                    onClick={() => this.handleFilterChange(null)}
                  >
                    All
                  </button>
                  <button
                    className={`inline-button-mid filter-button ${selectedLevel === ProficiencyLevel.Beginner
                      ? "selected"
                      : ""
                      }`}
                    onClick={() =>
                      this.handleFilterChange(ProficiencyLevel.Beginner)
                    }
                  >
                    Familiar
                  </button>
                  <button
                    className={`inline-button-mid filter-button ${selectedLevel === ProficiencyLevel.Intermediate
                      ? "selected"
                      : ""
                      }`}
                    onClick={() =>
                      this.handleFilterChange(ProficiencyLevel.Intermediate)
                    }
                  >
                    Proficient
                  </button>
                  <button
                    className={`inline-button-end filter-button ${selectedLevel === ProficiencyLevel.Expert
                      ? "selected"
                      : ""
                      }`}
                    onClick={() =>
                      this.handleFilterChange(ProficiencyLevel.Expert)
                    }
                  >
                    Advanced
                  </button>
                </div>

                <div className="sort-buttons">
                  <button
                    className={`sort-button inline-button-start ${sortBy === "name" ? "selected" : ""
                      }`}
                    onClick={() => this.handleSortChange("name")}
                  >
                    Sort by Name
                  </button>
                  <button
                    className={`sort-button inline-button-end ${sortBy === "level" ? "selected" : ""
                      }`}
                    onClick={() => this.handleSortChange("level")}
                  >
                    Sort by Level
                  </button>
                </div>

                <div className="category-dropdown">
                  <select
                    onChange={this.handleCategoryChange}
                    value={selectedCategory || ""}
                  >
                    <option value="">All Categories</option>
                    {Object.values(Categories).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                id="portfolio-wrapper"
                className="bgrid-quarters s-bgrid-thirds cf"
              >
                {proficiencyItems}
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default Portfolio;
