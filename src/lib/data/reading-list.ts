export interface Book {
    title: string
    author: string
    format?: 'audiobook'
}

export interface YearGroup {
    year: number | 'Earlier'
    books: Book[]
}

export const READING_LIST: YearGroup[] = [
    {
        year: 2026,
        books: [
            {
                title: 'The Anxious Generation: How the Great Rewiring of Childhood Is Causing an Epidemic of Mental Illness',
                author: 'Jonathan Haidt',
                format: 'audiobook',
            },
            {
                title: 'No More Mr. Nice Guy: A Proven Plan For Getting What You Want In Love, Sex, And Life',
                author: 'Robert A. Glover',
                format: 'audiobook',
            },
            { title: 'Murder in Mesopotamia', author: 'Agatha Christie' },
            {
                title: 'The Darkest White: A Mountain Legend and the Avalanche That Took Him',
                author: 'Eric Blehm',
            },
            {
                title: 'Freakonomics: A Rogue Economist Explores the Hidden Side of Everything',
                author: 'Steven Levitt and Stephen J. Dubner',
                format: 'audiobook',
            },
        ],
    },
    {
        year: 2025,
        books: [
            { title: 'Player Piano', author: 'Kurt Vonnegut' },
            {
                title: 'The Last Blue Mountain: The Great Karakoram Climbing Tragedy',
                author: 'Ralph Barker',
            },
            { title: 'Ready Player Two', author: 'Ernest Cline' },
            {
                title: 'Lolita',
                author: 'Vladimir Nabokov',
                format: 'audiobook',
            },
            {
                title: 'Fire Weather: The Making of a Beast',
                author: 'John Vaillant',
            },
            {
                title: 'The Color of Everything: A Journey to Quiet the Chaos Within',
                author: 'Cory Richards',
            },
            {
                title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
                author: 'James Clear',
            },
            {
                title: 'Anxious for Nothing: Finding Calm in a Chaotic World',
                author: 'Max Lucado',
                format: 'audiobook',
            },
            {
                title: 'Try Softer: A Fresh Approach to Move Us out of Anxiety, Stress, and Survival Mode—and into a Life of Connection and Joy',
                author: 'Aundi Kolber',
            },
            { title: 'How to Win Over Depression', author: 'Tim LaHaye' },
            { title: 'Where the Crawdads Sing', author: 'Delia Owens' },
            {
                title: 'Extreme Ownership: How U.S. Navy SEALs Lead and Win',
                author: 'Jocko Willink and Leif Babin',
                format: 'audiobook',
            },
            {
                title: '12 Rules for Life: An Antidote to Chaos',
                author: 'Jordan B. Peterson',
                format: 'audiobook',
            },
            {
                title: 'God on Mute: Engaging the Silence of Unanswered Prayer',
                author: 'Pete Greig',
                format: 'audiobook',
            },
            {
                title: 'Brain Energy: A Revolutionary Breakthrough in Understanding Mental Health—and Improving Treatment for Anxiety, Depression, OCD, PTSD, and More',
                author: 'Christopher M. Palmer, MD',
                format: 'audiobook',
            },
            {
                title: 'The Year of Less',
                author: 'Cait Flanders',
                format: 'audiobook',
            },
            {
                title: 'Dream Big: Know What You Want, Why You Want It, and What You’re Going to Do About It',
                author: 'Bob Goff',
            },
            {
                title: 'Eight Dates: Essential Conversations for a Lifetime of Love',
                author: 'John Gottman and Julie Schwartz Gottman',
            },
        ],
    },
    {
        year: 2024,
        books: [
            { title: 'All the Light We Cannot See', author: 'Anthony Doerr' },
            { title: 'An Unquiet Mind', author: 'Kay Redfield Jamison' },
            {
                title: 'The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life',
                author: 'Mark Manson',
            },
            {
                title: 'The Meaning of Marriage: Facing the Complexities of Commitment with the Wisdom of God',
                author: 'Timothy Keller',
            },
            {
                title: 'The Year of Living Biblically: One Man’s Humble Quest to Follow the Bible as Literally as Possible',
                author: 'A.J. Jacobs',
            },
            {
                title: 'Love Does: Discover a Secretly Incredible Life in an Ordinary World',
                author: 'Bob Goff',
            },
            { title: 'My Dark Vanessa', author: 'Kate Elizabeth Russell' },
            {
                title: 'Undistracted: Capture Your Purpose. Rediscover Your Joy.',
                author: 'Bob Goff',
            },
            {
                title: 'The Golden Spruce: A True Story of Myth, Madness, and Greed',
                author: 'John Vaillant',
            },
            {
                title: 'Scattered Minds: The Origins and Healing of Attention Deficit Disorder',
                author: 'Gabor Maté',
            },
            {
                title: 'Everybody, Always: Becoming Love in a World Full of Setbacks and Difficult People',
                author: 'Bob Goff',
            },
            { title: 'The Essex Serpent', author: 'Sarah Perry' },
            {
                title: 'One Hundred Years of Solitude',
                author: 'Gabriel García Márquez',
            },
            {
                title: 'The Ruthless Elimination of Hurry: How to Stay Emotionally Healthy and Spiritually Alive in the Chaos of the Modern World',
                author: 'John Mark Comer',
            },
            {
                title: 'I Don’t Want to Talk About It: Overcoming the Secret Legacy of Male Depression',
                author: 'Terrence Real',
            },
            {
                title: 'Outlive: The Science & Art of Longevity',
                author: 'Peter Attia, MD',
            },
            {
                title: 'Ministries of Mercy: The Call of the Jericho Road',
                author: 'Timothy Keller',
            },
        ],
    },
    {
        year: 2023,
        books: [
            { title: 'It', author: 'Stephen King' },
            { title: 'Breathless', author: 'Amy McCulloch' },
            {
                title: 'Structured Chaos: The Unusual Life of a Climber',
                author: 'Victor Saunders',
            },
            {
                title: 'Prayer: Does It Make Any Difference?',
                author: 'Philip Yancey',
            },
            { title: 'The Dharma Bums', author: 'Jack Kerouac' },
            {
                title: 'Barbarian Days: A Surfing Life',
                author: 'William Finnegan',
            },
            { title: 'Where the Clouds Can Go', author: 'Conrad Kain' },
            { title: 'Native Air', author: 'Jonathan Howland' },
            { title: 'The Metamorphosis', author: 'Franz Kafka' },
            { title: 'Human Traces', author: 'Sebastian Faulks' },
        ],
    },
    {
        year: 2022,
        books: [
            { title: 'The Secret Agent', author: 'Joseph Conrad' },
            { title: 'Ridgerunner', author: 'Gil Adamson' },
            {
                title: 'What God Has to Say about Our Bodies: How the Gospel Is Good News for Our Physical Selves',
                author: 'Sam Allberry',
            },
            {
                title: 'Countdown to Zero Day: Stuxnet and the Launch of the World’s First Digital Weapon',
                author: 'Kim Zetter',
            },
            { title: 'The Death of Ivan Ilyich', author: 'Leo Tolstoy' },
            { title: 'One Green Bottle', author: 'Elizabeth Coxhead' },
            { title: 'Brave New World Revisited', author: 'Aldous Huxley' },
            { title: 'Brave New World', author: 'Aldous Huxley' },
        ],
    },
    {
        year: 2021,
        books: [
            { title: 'The Runaway Jury', author: 'John Grisham' },
            { title: 'Uncanny Valley', author: 'Anna Wiener' },
            { title: 'The Firm', author: 'John Grisham' },
            { title: 'The Mosquito Coast', author: 'Paul Theroux' },
            {
                title: 'Fearfully and Wonderfully Made',
                author: 'Dr. Paul Brand and Philip Yancey',
            },
            { title: 'Carrie', author: 'Stephen King' },
            {
                title: 'The Stand: The Complete & Uncut Edition',
                author: 'Stephen King',
            },
            {
                title: '50 Percent of Mountaineering is Uphill',
                author: 'Susanna Pfisterer',
            },
            { title: 'The Pilgrim’s Progress', author: 'John Bunyan' },
            { title: 'McTeague', author: 'Frank Norris' },
            {
                title: 'On Writing: A Memoir of the Craft',
                author: 'Stephen King',
            },
            { title: 'The Body: A Guide for Occupants', author: 'Bill Bryson' },
        ],
    },
    {
        year: 2020,
        books: [
            {
                title: 'Anna Karenin',
                author: 'Leo Tolstoy, trans. Rosemary Edmonds',
            },
            {
                title: 'Reminiscences of a Stock Operator',
                author: 'Edwin Lefèvre',
            },
            { title: 'At Home in Nature', author: 'Rob Wood' },
            {
                title: 'This Is Depression: A Comprehensive, Compassionate Guide for Anyone Who Wants to Understand Depression',
                author: 'Diane McIntosh',
            },
            {
                title: 'The Question of God: C.S. Lewis and Sigmund Freud Debate God, Love, Sex, and the Meaning of Life',
                author: 'Armand Nicholi',
            },
            { title: 'Famous Last Words', author: 'Timothy Findley' },
        ],
    },
    {
        year: 2019,
        books: [
            { title: 'South', author: 'Ernest Shackleton' },
            { title: 'Little Fires Everywhere', author: 'Celeste Ng' },
            { title: 'Educated', author: 'Tara Westover' },
            {
                title: 'Amusing Ourselves to Death: Public Discourse in the Age of Show Business',
                author: 'Neil Postman',
            },
            { title: 'Beyond the Mountain', author: 'Steve House' },
            {
                title: 'Echoes: One Climber’s Hard Road to Freedom',
                author: 'Nick Bullock',
            },
        ],
    },
    {
        year: 2018,
        books: [
            { title: 'Ready Player One', author: 'Ernest Cline' },
            { title: 'Crazy Rich Asians', author: 'Kevin Kwan' },
            { title: 'China Rich Girlfriend', author: 'Kevin Kwan' },
            { title: 'Rich People Problems', author: 'Kevin Kwan' },
            {
                title: 'The Bold and Cold: A History of 25 Classic Climbs in the Canadian Rockies',
                author: 'Brandon Pullan',
            },
            {
                title: 'Art of Freedom: The Life and Climbs of Voytek Kurtyka',
                author: 'Bernadette McDonald',
            },
            {
                title: 'Autonomy, Mastery and Purpose in the Avalanche Patch',
                author: 'Bruce Kay',
            },
            {
                title: 'Mountains in My Heart: A Passion for Climbing',
                author: 'Gerlinde Kaltenbrunner',
            },
            { title: 'A Purpose Ridden', author: 'Ryan Correy' },
            { title: 'Modern Romance', author: 'Aziz Ansari' },
            {
                title: 'How to Win Friends and Influence People',
                author: 'Dale Carnegie',
            },
            { title: 'Radical', author: 'David Platt' },
            {
                title: 'The 10 Best Decisions a Man Can Make: The Adventure of Living in God’s Plan',
                author: 'Bill Farrel',
            },
            {
                title: 'Soul Survivor: How My Faith Survived the Church',
                author: 'Philip Yancey',
            },
        ],
    },
    {
        year: 2017,
        books: [
            {
                title: 'The Reason for God: Belief in an Age of Skepticism',
                author: 'Timothy Keller',
            },
            { title: 'Mere Christianity', author: 'C.S. Lewis' },
            { title: 'The Case for a Creator', author: 'Lee Strobel' },
            { title: 'The Case for Faith', author: 'Lee Strobel' },
            { title: 'Disappointment with God', author: 'Philip Yancey' },
            {
                title: 'What’s So Amazing About Grace?',
                author: 'Philip Yancey',
            },
            { title: 'Who Moved the Stone?', author: 'Frank Morison' },
            { title: 'The Real Face of Atheism', author: 'Ravi Zacharias' },
            { title: 'The Problem of God', author: 'Mark Clark' },
            { title: 'Orthodoxy', author: 'Gilbert Keith Chesterton' },
        ],
    },
    {
        year: 2016,
        books: [
            { title: 'I Hope They Serve Beer in Hell', author: 'Tucker Max' },
            { title: 'Sloppy Seconds', author: 'Tucker Max' },
            { title: 'Hilarity Ensues', author: 'Tucker Max' },
            {
                title: 'Flash Boys: A Wall Street Revolt',
                author: 'Michael Lewis',
            },
            { title: 'When Breath Becomes Air', author: 'Paul Kalanithi' },
            {
                title: 'Better: A Surgeon’s Notes on Performance',
                author: 'Atul Gawande',
            },
            { title: 'Being Mortal', author: 'Atul Gawande' },
            { title: 'The Checklist Manifesto', author: 'Atul Gawande' },
            {
                title: 'One Day in the Life of Ivan Denisovich',
                author: 'Aleksandr Solzhenitsyn',
            },
        ],
    },
    {
        year: 2015,
        books: [
            {
                title: 'Summit Fever: The Story of an Armchair Climber on the 1984 Mustagh Tower Expedition',
                author: 'Andrew Greig',
            },
        ],
    },
    {
        year: 2014,
        books: [
            {
                title: 'The Calling: A Life Rocked by Mountains',
                author: 'Barry Blanchard',
            },
            {
                title: 'One Day as a Tiger: Alex Macintyre and the Birth of Light and Fast Alpinism',
                author: 'John Porter',
            },
            {
                title: 'K2: Life and Death on the World’s Most Dangerous Mountain',
                author: 'Ed Viesturs',
            },
            {
                title: 'Annapurna: First Conquest of an 8000-meter Peak',
                author: 'Maurice Herzog',
            },
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
        ],
    },
    {
        year: 2013,
        books: [
            { title: 'Doctor Sleep', author: 'Stephen King' },
            {
                title: 'The Will to Climb: Obsession and Commitment and the Quest to Climb Annapurna—the World’s Deadliest Peak',
                author: 'Ed Viesturs',
            },
        ],
    },
    {
        year: 2012,
        books: [
            {
                title: 'No Shortcuts to the Top: Climbing the World’s 14 Highest Peaks',
                author: 'Ed Viesturs',
            },
            { title: 'Sh*t My Dad Says', author: 'Justin Halpern' },
            { title: 'I Suck at Girls', author: 'Justin Halpern' },
        ],
    },
    {
        year: 'Earlier',
        books: [
            { title: 'Chickenhawk', author: 'Robert Mason' },
            { title: 'Dune', author: 'Frank Herbert' },
            { title: 'Ender’s Game', author: 'Orson Scott Card' },
            { title: 'Nineteen Eighty-Four', author: 'George Orwell' },
            { title: 'Birdsong', author: 'Sebastian Faulks' },
            { title: 'Absolute Friends', author: 'John le Carré' },
            { title: 'The Guns of Navarone', author: 'Alistair MacLean' },
            { title: 'Z for Zachariah', author: "Robert C. O'Brien" },
            { title: 'Dragonsbane', author: 'Barbara Hambly' },
            { title: 'The Hunt for Red October', author: 'Tom Clancy' },
            { title: 'Rite of Passage', author: 'Alexei Panshin' },
            { title: 'Fallen Angels', author: 'Walter Dean Myers' },
            { title: 'Deathwatch', author: 'Robb White' },
            { title: 'Different Seasons', author: 'Stephen King' },
        ],
    },
]
