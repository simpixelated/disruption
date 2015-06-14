IPOfest is a game of startups. Hire staff, pick your tech, and create a project. Try to create the next Facebook and get a better valuation than your competitors.

## Installation

You will need Node.js (including npm) -- which should get you grunt, bower, etc.

1. Run "npm install" from root.
2. Get bower_components by running "bower install".
3. Start node and the app by running "grunt nodemon" (will restart with changes to code).
4. Navigate to "localhost:3000"

## Rules:

#### Company
    
1. Your main resource is "equity". Each company starts with 100% of the equity owned by you. You must sell equity to hire employees, who can be used to build projects, which increases the valuation of your company. Cash out at the right time and your remaining equity will be worth more than you spent to start the company. 
    1. You cannot sell more than 99% of your company's equity.
    2. The more equity you sell, the less "cash" you will receive for your IPO.
2. You can only run one company at a time. Once you "cash out", you can no longer run that company and must start a new one.

#### Employees
    
1. Hiring employees requires selling equity. Since this is a startup, you can't afford to pay a real salary, so you'll have to sell a percentage of your ownership of the company (which may or may not pay off).
2. Employees demand a fare share of equity based upon their own experience and the size of your company. 
    1. The exact percentage is based upon the current valuation of the tags (skills) they have and the level of each.
    2. The higher your company's current valuation, the less equity new employees can demand. 1% equity of a $200k company is a lot less than 1% equity of a $200 million company.
    3. The range of equity a new employee will demand is between 1% (min) and 49% (max).
    4. Once an employee is hired, they're equity percentage is locked in until you cash out.
3. You cannot fire employees once they have been hired.
4. Employees will gain experience for each of their tags that they use to complete a level of for a project. The difficulty, or amount of experience required grows with each level. So earning level 10 in Android is significanty more difficult than earning level 2.
5. The level of each employee's tags does not increase your company's valuation, it only allows more work per turn on your projects.

#### Projects
    
1. Projects represent the creations of your company. They are not always products, but they can be. However an entire startup can be based on something seemingly less than a product, like a blog (think Techcrunch) or a new social networking platform (think Facebook). Each type of project has a specific "tech tree" with various optional branches. Which tags you choose to apply at each branch may determine the overall sucess or failure of that project.

2. A project's worth is based on the valuation of the tags (think of these as features) that have been added to them, as well as bonuses for completed branches/levels of the tech tree and other achievements.

    1. In order to advance a project, you must either add another point to an existing tag, or choose another tag to add that is within your tech tree path. However, you can only add the tags that your staff have. You may have to hire more staff to keep expanding the feature set of a project.    
    3. Your staff will automatically split up their time between projects.

#### Tags
    
1. The valuation of a tag is based on real world statistics.
2. While the level of a tag (on a project) increases its worth, a level 1 tag can be worth more than a level 10 tag if it is currently much more popular. Old technologies do not retain their value well.
3. New tags can be added every day.

#### Valuation
    
1. The valuation of a project only considers the completed level of each tag. So starting to work on Android(1) does not add to the projects value until it is completed.
2. company valuation is mostly based on the total combined valuation of your projects
3. "cashing out" takes your valuation # as a % of the total market valuation, converts that to a % of the pool ($/BTC), then dispenses your cut based on remaining equity ($pool\*($my\_val/$market\_val))\*$my_equity